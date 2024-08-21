import { sql } from '@vercel/postgres';

export async function seedItems() {
  await sql`
      CREATE TABLE IF NOT EXISTS items (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        updated_at TIMESTAMPTZ NOT NULL,

        parent_item_id UUID,

        name TEXT NOT NULL CHECK (name <> ''),
        category TEXT NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT NOT NULL,
        location_description TEXT NOT NULL
      );
    `;
}