"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ItemFormState } from "../_ui/items/item-form";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { ItemFormSchema } from "./data-definitions";

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
});

function createImageUrl(imageKey: string) {
  return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${imageKey}`;
}

function getImageKey(imageUrl: string) {
  return imageUrl.split("/").pop();
}

function revalidateAndRedirectItems(): never {
  revalidatePath("/dashboard/items");
  revalidatePath("/dashboard/items/[id]", "page");
  revalidatePath("/dashboard/items/[id]/edit", "page");

  redirect("/dashboard/items");
}

export async function createItem(
  prevState: ItemFormState,
  formData: FormData,
): Promise<ItemFormState> {
  const validatedForm = ItemFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedForm.success) {
    return {
      errors: validatedForm.error.flatten().fieldErrors,
      message: "Invalid fields. Could not create item.",
    };
  }

  const d = validatedForm.data;

  if (d.parent_item_id === "") d.parent_item_id = null;

  let image_url = "";

  if (d.image.size !== 0) {
    try {
      const imageExtension = d.image.type.split("/")[1];
      const imageKey = crypto.randomUUID() + "." + imageExtension;
      const imageData = await d.image.arrayBuffer();

      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageKey,
        Body: imageData as Buffer,
      });

      await s3Client.send(command);

      image_url = createImageUrl(imageKey);
    } catch (err) {
      return {
        message: "Image upload error. Could not create item.",
      };
    }
  }

  try {
    await sql`
    INSERT INTO items (updated_at, parent_item_id, name, category, image_url, description, location_description)
    VALUES (${new Date().toISOString()}, ${d.parent_item_id}, ${d.name}, ${d.category}, ${image_url}, ${d.description}, ${d.location_description})
  `;
  } catch (err) {
    return {
      message: "Database error. Could not create item.",
    };
  }

  revalidateAndRedirectItems();
}

export async function editItem(
  id: string,
  prevState: ItemFormState,
  formData: FormData,
): Promise<ItemFormState> {
  const validatedForm = ItemFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedForm.success) {
    return {
      errors: validatedForm.error.flatten().fieldErrors,
      message: "Invalid fields. Could not edit item.",
    };
  }

  const d = validatedForm.data;

  if (d.parent_item_id === "") d.parent_item_id = null;

  try {
    await sql`
    UPDATE items 
    SET (updated_at, parent_item_id, name, category, image_url, description, location_description) =
    (${new Date().toISOString()}, ${d.parent_item_id}, ${d.name}, ${d.category}, ${d.image_url}, ${d.description}, ${d.location_description})
    WHERE items.id = ${id};
  `;
  } catch (err) {
    return {
      message: "Database error. Could not edit item.",
    };
  }

  revalidateAndRedirectItems();
}

export async function deleteItem(id: string) {
  try {
    const data = await sql<{
      image_url: string;
    }>`SELECT image_url FROM items WHERE items.id = ${id}`;

    if (data.rowCount !== 1) throw new Error("Invalid item id.");

    await sql`DELETE FROM items WHERE items.id = ${id}`;

    // Delete item image if exists
    if (data.rows[0].image_url) {
      const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: getImageKey(data.rows[0].image_url),
      });

      await s3Client.send(command);
    }
  } catch (err) {
    return {
      message: "Could not delete item.",
    };
  }

  revalidateAndRedirectItems();
}
