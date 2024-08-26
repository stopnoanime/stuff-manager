import { sql } from "@vercel/postgres";
import { ItemsTable, ItemWithParent, SelectOptions } from "./data-definitions";
import { z } from "zod";

export async function fetchItem(id: string) {
  if (!z.string().uuid().safeParse(id).success) return undefined;

  const data = await sql<ItemWithParent>`
    SELECT t1.*, t2.name as parent_item_name
    FROM items t1
    LEFT JOIN items t2
    ON t1.parent_item_id = t2.id
    WHERE t1.id = ${id};
  `;

  return data.rows[0];
}

export async function fetchChildItems(id: string) {
  if (!z.string().uuid().safeParse(id).success) return [];

  const data = await sql<ItemsTable>`
    SELECT *
    FROM items
    WHERE parent_item_id = ${id};
  `;

  return data.rows;
}

export async function fetchAllItems() {
  const data = await sql<ItemsTable>`
    SELECT *
    FROM items;
  `;

  return data.rows;
}

export async function fetchAllItemsAsOptions(): Promise<SelectOptions> {
  const data = await sql<{ id: string; name: string }>`
    SELECT id, name
    FROM items;
  `;

  return data.rows.map((r) => ({ label: r.name, value: r.id }));
}

export async function fetchAllCategories() {
  const data = await sql<{ category: string }>`
    SELECT DISTINCT category FROM items WHERE category <> ''
    UNION
    SELECT DISTINCT category FROM predefined_categories
    ORDER BY category;
  `;

  return data.rows.map((r) => r.category);
}
