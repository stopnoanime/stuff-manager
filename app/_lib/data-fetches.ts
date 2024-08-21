import { sql } from "@vercel/postgres";
import { ItemsTable } from "./data-definitions";

export async function fetchItem(id: string) {
  const data = await sql<ItemsTable>`
    SELECT *
    FROM items
    WHERE items.id = ${id};
  `;

  return data.rows[0]
}

export async function fetchItems() {
  const data = await sql<ItemsTable>`
    SELECT *
    FROM items;
  `;

  return data.rows;
}