import { createItem } from "@/app/_lib/data-actions";
import {
  fetchAllCategories,
  fetchAllItemsAsOptions,
} from "@/app/_lib/data-fetches";
import PageTemplate from "@/app/_ui/general/page-template";
import ItemForm from "@/app/_ui/item/item-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Item",
};

export default async function Page() {
  const [items, categories] = await Promise.all([
    fetchAllItemsAsOptions(),
    fetchAllCategories(),
  ]);

  return (
    <PageTemplate title="Create item">
      <ItemForm
        action={createItem}
        otherItems={items}
        categories={categories}
      ></ItemForm>
    </PageTemplate>
  );
}
