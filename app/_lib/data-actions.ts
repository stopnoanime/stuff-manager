'use server';
 
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createItem(formData: FormData) {
  const formSchema = z.object({
    parent_item_id: z.string(),
    name: z.string(),
    category: z.string(),
    image_url: z.string(),
    description: z.string(),
    location_description: z.string(),
  });

  const d = formSchema.parse(Object.fromEntries(formData.entries()))
  
  if(d.parent_item_id === "")
    d.parent_item_id = null as any;

  await sql`
    INSERT INTO items (parent_item_id, name, category, image_url, description, location_description)
    VALUES (${d.parent_item_id}, ${d.name}, ${d.category}, ${d.image_url}, ${d.description}, ${d.location_description})
  `;

  revalidatePath('/dashboard/item');
}