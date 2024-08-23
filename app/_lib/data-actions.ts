"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ItemFormState } from "../_ui/items/item-form";

const ItemFormSchema = z.object({
  parent_item_id: z.string().nullable(),
  name: z.string().min(1, "Please enter a name."),
  category: z.string(),
  image_url: z.string(),
  description: z.string(),
  location_description: z.string(),
});

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

  try {
    await sql`
    INSERT INTO items (updated_at, parent_item_id, name, category, image_url, description, location_description)
    VALUES (${new Date().toISOString()}, ${d.parent_item_id}, ${d.name}, ${d.category}, ${d.image_url}, ${d.description}, ${d.location_description})
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
  await sql`DELETE FROM items WHERE items.id = ${id}`;

  revalidateAndRedirectItems();
}
