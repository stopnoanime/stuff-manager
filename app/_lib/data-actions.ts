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

async function getItemImageURL(id: string) {
  const data = await sql<{
    image_url: string;
  }>`SELECT image_url FROM items WHERE items.id = ${id}`;

  if (data.rowCount !== 1) throw new Error("Invalid item id.");

  return data.rows[0].image_url;
}

async function deleteItemImage(image_url: string) {
  if (image_url) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: getImageKey(image_url),
    });

    await s3Client.send(command);
  }
}

async function uploadItemImage(image: File) {
  if (image.size === 0) return "";

  const imageExtension = image.type.split("/")[1];
  const imageKey = crypto.randomUUID() + "." + imageExtension;
  const imageData = await image.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: imageKey,
    Body: imageData as Buffer,
  });

  await s3Client.send(command);

  return createImageUrl(imageKey);
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

  try {
    const d = validatedForm.data;

    if (d.parent_item_id === "") d.parent_item_id = null;

    const image_url = await uploadItemImage(d.image);

    await sql`
      INSERT INTO items (updated_at, parent_item_id, name, category, image_url, description, location_description)
      VALUES (${new Date().toISOString()}, ${d.parent_item_id}, ${d.name}, ${d.category}, ${image_url}, ${d.description}, ${d.location_description})
    `;
  } catch (err) {
    return {
      message: "Internal server error. Could not create item.",
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

  try {
    const d = validatedForm.data;

    if (d.parent_item_id === "") d.parent_item_id = null;

    const old_image_url = await getItemImageURL(id);
    const new_image_url =
      (await uploadItemImage(d.image)) || (d.delete_image ? "" : old_image_url);

    await sql`
      UPDATE items 
      SET (updated_at, parent_item_id, name, category, image_url, description, location_description) =
      (${new Date().toISOString()}, ${d.parent_item_id}, ${d.name}, ${d.category}, ${new_image_url}, ${d.description}, ${d.location_description})
      WHERE items.id = ${id};
    `;

    if (old_image_url !== new_image_url) deleteItemImage(old_image_url);
  } catch (err) {
    return {
      message: "Internal server error. Could not edit item.",
    };
  }

  revalidateAndRedirectItems();
}

export async function deleteItem(id: string) {
  try {
    const image_url = await getItemImageURL(id);

    await sql`DELETE FROM items WHERE items.id = ${id}`;

    await deleteItemImage(image_url);
  } catch (err) {
    return {
      message: "Internal server error. Could not delete item.",
    };
  }

  revalidateAndRedirectItems();
}
