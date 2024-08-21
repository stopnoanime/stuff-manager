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