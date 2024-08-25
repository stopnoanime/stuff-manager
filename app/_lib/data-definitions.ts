import { z } from "zod";

export type ItemsTable = {
  id: string;
  updated_at: string;

  parent_item_id: string | null;

  name: string;
  category: string;
  image_url: string;
  description: string;
  location_description: string;
};

export type ItemWithParent = ItemsTable & {
  parent_item_name: string | null;
};

export type SelectOptions = { label: string; value: string }[];

export const ImageSchema = z.instanceof(File)
.refine(f => f.size <= 1024 * 1024 * 5, `Max image size is 5 MB.`)
.refine(f => f.size === 0 || ['image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'].includes(f.type), "Only .webp, .jpeg, and .png formats are supported.")

export const ItemFormSchema = z.object({
  parent_item_id: z.string().nullable(),
  name: z.string().min(1, "Please enter a name."),
  category: z.string(),
  image: ImageSchema,
  description: z.string(),
  location_description: z.string(),
});
