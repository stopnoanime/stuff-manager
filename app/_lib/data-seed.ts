import { sql } from "@vercel/postgres";
import "server-only";

export async function seedItems() {
  await sql`
      CREATE TABLE IF NOT EXISTS items (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        updated_at TIMESTAMPTZ NOT NULL,
        user_id TEXT NOT NULL,

        parent_item_id UUID REFERENCES items(id) ON DELETE SET NULL,

        name TEXT NOT NULL CHECK (name <> ''),
        category TEXT NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT NOT NULL,
        location_description TEXT NOT NULL,
        is_favorite BOOLEAN NOT NULL,
        qr_code TEXT NOT NULL
      );
    `;
}

export async function seedCategories() {
  await sql`
      CREATE TABLE IF NOT EXISTS predefined_categories (
        category TEXT UNIQUE NOT NULL CHECK (category <> '')
      );
    `;

  await sql`
    INSERT INTO predefined_categories
    VALUES 
    ('Electronics'),
    ('Furniture'),
    ('Household Items'),
    ('Tools'),
    ('Boxes')
    ON CONFLICT DO NOTHING;
  `;
}
