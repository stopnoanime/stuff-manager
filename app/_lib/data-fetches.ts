import { sql } from "@vercel/postgres";
import {
  DashboardStatistics,
  Item,
  ItemWithParent,
  ItemWithPath,
  SelectOptions,
} from "./data-definitions";
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

  const data = await sql<Item>`
    SELECT *
    FROM items
    WHERE parent_item_id = ${id}
    ORDER BY lower(name);
  `;

  return data.rows;
}

export async function fetchAllItems() {
  const data = await sql<Item>`
    SELECT *
    FROM items
    ORDER BY lower(name);
  `;

  return data.rows;
}

export async function fetchAllItemsAsOptions(): Promise<SelectOptions> {
  const data = await sql<{ id: string; name: string }>`
    SELECT id, name
    FROM items
    ORDER BY lower(name);
  `;

  return data.rows.map((r) => ({ label: r.name, value: r.id }));
}

export async function fetchAllCategories() {
  const data = await sql<{ category: string }>`
    SELECT *
    FROM (
      SELECT DISTINCT category FROM items WHERE category <> ''
      UNION
      SELECT DISTINCT category FROM predefined_categories
    )
    ORDER BY lower(category);
  `;

  return data.rows.map((r) => r.category);
}

export async function fetchAllItemsAsTree() {
  const data = await sql<ItemWithPath>`
    WITH RECURSIVE items_tree AS (
        SELECT *, ARRAY[id] AS path
        FROM items WHERE parent_item_id IS NULL
      UNION
        SELECT t.*, items_tree.path || t.id
        FROM items t
        JOIN items_tree ON items_tree.id = t.parent_item_id
    )
    SELECT *, array_length(path,1) - 1 AS depth
    FROM items_tree
    ORDER BY path;
  `;

  return data.rows;
}

export async function fetchAllRootItems() {
  const data = await sql<Item>`
    SELECT *
    FROM items 
    WHERE parent_item_id IS NULL
    ORDER BY lower(name);
  `;

  return data.rows;
}

export async function fetchDashboardStatistics() {
  const data = await sql<DashboardStatistics>`
    SELECT  (
      SELECT COUNT(*)
      FROM items
    ) AS item_count,
    (
      SELECT COUNT(DISTINCT category) 
      FROM items 
      WHERE category <> ''
    ) AS category_count,
    (
      SELECT COUNT(*) 
      FROM items 
      WHERE image_url <> ''
    ) AS image_count,
    (
      SELECT COUNT(*) 
      FROM items 
      WHERE is_favorite IS TRUE
    ) AS favorite_count;
  `;

  return data.rows[0];
}

export async function fetchAllFavoriteItems() {
  const data = await sql<Item>`
    SELECT *
    FROM items 
    WHERE is_favorite IS TRUE
    ORDER BY lower(name);
  `;

  return data.rows;
}
