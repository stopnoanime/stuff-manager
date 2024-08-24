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
