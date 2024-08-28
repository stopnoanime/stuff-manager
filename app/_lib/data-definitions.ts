import { z } from "zod";

export type Item = {
  id: string;
  updated_at: string;
  user_id: string;

  parent_item_id: string | null;

  name: string;
  category: string;
  image_url: string;
  description: string;
  location_description: string;
  is_favorite: boolean;
};

export type ItemWithParent = Item & {
  parent_item_name: string | null;
};

export type ItemWithPath = Item & {
  depth: number;
  path: string[];
};

export type SelectOptions = { label: string; value: string }[];

export type DashboardStatistics = {
  item_count: string;
  category_count: string;
  image_count: string;
  favorite_count: string;
};

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ImageSchema = z
  .instanceof(File)
  .refine((f) => f.size <= 1024 * 1024 * 5, `Max image size is 5 MB.`)
  .refine(
    (f) => f.size === 0 || ALLOWED_IMAGE_TYPES.includes(f.type),
    "Only .webp, .jpeg, and .png formats are supported.",
  );

export const ItemFormSchema = z.object({
  parent_item_id: z.string().nullable(),
  name: z.string().min(1, "Please enter a name."),
  category: z.string(),
  image: ImageSchema,
  delete_image: z.enum(["", "true"]),
  description: z.string(),
  location_description: z.string(),
  is_favorite: z.enum(["true", "false"]),
});
