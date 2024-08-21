'use server';
 
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const itemFormSchema = z.object({
  parent_item_id: z.string().nullable(),
  name: z.string().min(1),
  category: z.string(),
  image_url: z.string(),
  description: z.string(),
  location_description: z.string(),
});

function revalidateAndRedirectItems() {
  revalidatePath('/dashboard/items');
  revalidatePath('/dashboard/items/[id]', 'page')
  revalidatePath('/dashboard/items/[id]/edit', 'page')

  redirect('/dashboard/items');
}

export async function createItem(formData: FormData) {
  const d = itemFormSchema.parse(Object.fromEntries(formData.entries()))
  
  if(d.parent_item_id === "")
    d.parent_item_id = null;

  await sql`
    INSERT INTO items (updated_at, parent_item_id, name, category, image_url, description, location_description)
    VALUES (${new Date().toISOString()}, ${d.parent_item_id}, ${d.name}, ${d.category}, ${d.image_url}, ${d.description}, ${d.location_description})
  `;

  revalidateAndRedirectItems();
}

export async function editItem(id: string, formData: FormData) {
  const d = itemFormSchema.parse(Object.fromEntries(formData.entries()))
  
  if(d.parent_item_id === "")
    d.parent_item_id = null;

  await sql`
    UPDATE items 
    SET (updated_at, parent_item_id, name, category, image_url, description, location_description) =
    (${new Date().toISOString()}, ${d.parent_item_id}, ${d.name}, ${d.category}, ${d.image_url}, ${d.description}, ${d.location_description})
    WHERE items.id = ${id};
  `;

  revalidateAndRedirectItems();
}

export async function deleteItem(id: string) {
  await sql`DELETE FROM items WHERE items.id = ${id}`;

  revalidateAndRedirectItems();
}