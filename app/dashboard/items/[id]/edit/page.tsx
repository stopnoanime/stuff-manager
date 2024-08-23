import { Metadata } from "next";
import {
  fetchAllCategories,
  fetchAllItemsShort,
  fetchItem,
} from "@/app/_lib/data-fetches";
import { notFound } from "next/navigation";
import ItemForm from "@/app/_ui/items/item-form";
import { editItem } from "@/app/_lib/data-actions";

export const metadata: Metadata = {
  title: "Item Edit",
};

export default async function Page({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);

  if (!item) notFound();

  const [items, categories] = await Promise.all([
    fetchAllItemsShort(),
    fetchAllCategories(),
  ]);

  const editItemWithId = editItem.bind(null, params.id);

  return (
    <div>
      <h1 className="text-2xl font-light mb-6">Edit {item.name}</h1>
      <div className="max-w-[70vw] mx-auto">
        <ItemForm
          defaultValue={item}
          action={editItemWithId}
          otherItems={items}
          categories={categories}
        ></ItemForm>
      </div>
    </div>
  );
}
