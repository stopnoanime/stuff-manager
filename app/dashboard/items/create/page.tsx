import { createItem } from "@/app/_lib/data-actions";
import {
  fetchAllCategories,
  fetchAllItemsShort,
} from "@/app/_lib/data-fetches";
import ItemForm from "@/app/_ui/items/item-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Item",
};

export default async function Page() {
  const [items, categories] = await Promise.all([
    fetchAllItemsShort(),
    fetchAllCategories(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-light mb-6">Create item</h1>
      <div className="max-w-[70vw] mx-auto">
        <ItemForm
          action={createItem}
          otherItems={items}
          categories={categories}
        ></ItemForm>
      </div>
    </div>
  );
}
