import "server-only";
import { sql } from "@vercel/postgres";
import {
  AutocompleteItem,
  DashboardStatistics,
  Item,
  ItemWithParent,
  ItemWithPath,
  SelectOptions,
} from "./data-definitions";
import { z } from "zod";
import { getUser } from "./utils";

export async function fetchItem(id: string) {
  const user = await getUser();

  if (!z.string().uuid().safeParse(id).success) return undefined;

  const data = await sql<ItemWithParent>`
    SELECT t1.*, t2.name as parent_item_name
    FROM items t1
    LEFT JOIN items t2
    ON t1.parent_item_id = t2.id
    WHERE t1.id = ${id} AND t1.user_id = ${user.id};
  `;

  return data.rows[0];
}

export async function fetchChildItems(id: string) {
  const user = await getUser();

  if (!z.string().uuid().safeParse(id).success) return [];

  const data = await sql<Item>`
    SELECT *
    FROM items
    WHERE parent_item_id = ${id} AND user_id = ${user.id}
    ORDER BY lower(name);
  `;

  return data.rows;
}

export async function fetchAllItems() {
  const user = await getUser();

  const data = await sql<Item>`
    SELECT *
    FROM items
    WHERE user_id = ${user.id}
    ORDER BY lower(name);
  `;

  return data.rows;
}

export async function fetchAllItemsAsOptions(): Promise<SelectOptions> {
  const user = await getUser();

  const data = await sql<{ id: string; name: string }>`
    SELECT id, name
    FROM items
    WHERE user_id = ${user.id}
    ORDER BY lower(name);
  `;

  return data.rows.map((r) => ({ label: r.name, value: r.id }));
}

export async function fetchAllCategories() {
  const user = await getUser();

  const data = await sql<{ category: string }>`
    SELECT *
    FROM (
      SELECT DISTINCT category FROM items WHERE category <> '' AND user_id = ${user.id}
      UNION
      SELECT DISTINCT category FROM predefined_categories
    )
    ORDER BY lower(category);
  `;

  return data.rows.map((r) => r.category);
}

export async function fetchAllItemsAsTree() {
  const user = await getUser();

  const data = await sql<ItemWithPath>`
    WITH RECURSIVE items_tree AS (
        SELECT *, ARRAY[id] AS path
        FROM items WHERE parent_item_id IS NULL AND user_id = ${user.id}
      UNION
        SELECT t.*, items_tree.path || t.id
        FROM items t
        JOIN items_tree ON items_tree.id = t.parent_item_id AND items_tree.user_id = t.user_id
    )
    SELECT *, array_length(path,1) - 1 AS depth
    FROM items_tree
    ORDER BY path;
  `;

  return data.rows;
}

export async function fetchAllRootItems() {
  const user = await getUser();

  const data = await sql<Item>`
    SELECT *
    FROM items 
    WHERE parent_item_id IS NULL AND user_id = ${user.id}
    ORDER BY lower(name);
  `;

  return data.rows;
}

export async function fetchDashboardStatistics() {
  const user = await getUser();

  const data = await sql<DashboardStatistics>`
    SELECT  (
      SELECT COUNT(*)
      FROM items
      WHERE user_id = ${user.id}
    ) AS item_count,
    (
      SELECT COUNT(DISTINCT category) 
      FROM items 
      WHERE category <> '' AND user_id = ${user.id}
    ) AS category_count,
    (
      SELECT COUNT(*) 
      FROM items 
      WHERE image_url <> '' AND user_id = ${user.id}
    ) AS image_count,
    (
      SELECT COUNT(*) 
      FROM items 
      WHERE is_favorite IS TRUE AND user_id = ${user.id}
    ) AS favorite_count;
  `;

  return data.rows[0];
}

export async function fetchAllFavoriteItems() {
  const user = await getUser();

  const data = await sql<Item>`
    SELECT *
    FROM items 
    WHERE is_favorite IS TRUE AND user_id = ${user.id}
    ORDER BY lower(name);
  `;

  return data.rows;
}

export async function fetchItemsByQRCode(qr_code: string) {
  const user = await getUser();

  const data = await sql<ItemWithParent>`
    SELECT *
    FROM items
    WHERE qr_code = ${qr_code} AND user_id = ${user.id}
    ORDER BY lower(name);
  `;

  return data.rows;
}

export async function fetchItemsByQuery(query: string) {
  const user = await getUser();

  const data = await sql<ItemWithParent>`
    SELECT *
    FROM items
    WHERE user_id = ${user.id} AND (name || category || description || location_description) @@ ${query};
  `;

  return data.rows;
}

export async function fetchAutocompleteItemsByQuery(query: string) {
  const user = await getUser();

  const data = await sql<AutocompleteItem>`
    SELECT name, id
    FROM items
    WHERE user_id = ${user.id} AND (name || category || description || location_description) @@ ${query}
    LIMIT 10;
  `;

  return data.rows;
}
