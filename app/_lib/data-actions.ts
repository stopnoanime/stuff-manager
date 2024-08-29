"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ItemFormState } from "../_ui/items/item-form";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Item, ItemFormSchema } from "./data-definitions";
import { ItemDeleteState } from "../_ui/items/item-delete";
import { createImageS3Url, getImageS3Key, getUser, s3Client } from "./utils";

export async function createItem(
  prevState: ItemFormState,
  formData: FormData,
): Promise<ItemFormState> {
  const user = await getUser();

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
      INSERT INTO items 
      (updated_at, user_id, parent_item_id, name, category, image_url, description, location_description, is_favorite, qr_code)
      VALUES 
      (${new Date().toISOString()}, ${user.id}, ${d.parent_item_id}, ${d.name}, ${d.category}, ${image_url}, ${d.description}, ${d.location_description}, ${d.is_favorite}, ${d.qr_code});
    `;
  } catch (err) {
    console.log("Error while creating item: " + err);
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
  const user = await getUser();

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

    const oldItem = await getItemAndValidateUserId(id, user.id);

    const new_image_url =
      (await uploadItemImage(d.image)) ||
      (d.delete_image ? "" : oldItem.image_url);

    await sql`
      UPDATE items SET 
      (updated_at, parent_item_id, name, category, image_url, description, location_description, is_favorite, qr_code) =
      (${new Date().toISOString()}, ${d.parent_item_id}, ${d.name}, ${d.category}, ${new_image_url}, ${d.description}, ${d.location_description}, ${d.is_favorite}, ${d.qr_code})
      WHERE id = ${id};
    `;

    if (oldItem.image_url !== new_image_url) deleteItemImage(oldItem.image_url);
  } catch (err) {
    console.log("Error while editing item: " + err);
    return {
      message: "Internal server error. Could not edit item.",
    };
  }

  revalidateAndRedirectItems();
}

export async function deleteItem(id: string): Promise<ItemDeleteState> {
  const user = await getUser();

  try {
    const itemData = await getItemAndValidateUserId(id, user.id);

    await sql`DELETE FROM items WHERE id = ${id};`;

    await deleteItemImage(itemData.image_url);
  } catch (err) {
    console.log("Error while deleting item: " + err);
    return {
      message: "Internal server error. Could not delete item.",
    };
  }

  revalidateAndRedirectItems();
}

function revalidateAndRedirectItems(): never {
  revalidatePath("/dashboard/items");
  revalidatePath("/dashboard/items/[id]", "page");
  revalidatePath("/dashboard/items/[id]/edit", "page");

  redirect("/dashboard/items");
}

async function getItemAndValidateUserId(id: string, user_id?: string) {
  const data =
    await sql<Item>`SELECT * FROM items WHERE id = ${id} AND user_id = ${user_id};`;

  if (data.rowCount !== 1) throw new Error("Invalid item or user id.");

  return data.rows[0];
}

async function deleteItemImage(image_url: string) {
  if (image_url) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: getImageS3Key(image_url),
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

  return createImageS3Url(imageKey);
}
