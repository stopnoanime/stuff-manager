import { sql } from "@vercel/postgres";
import { ItemsTable } from "./data-definitions";

export async function fetchItem(id: string) {
  const data = await sql<ItemsTable>`
    SELECT *
    FROM items
    WHERE items.id = ${id};
  `;

  return data.rows[0];
}

export async function fetchAllItems() {
  const data = await sql<ItemsTable>`
    SELECT *
    FROM items;
  `;

  return data.rows;
}

export async function fetchAllItemsShort() {
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
