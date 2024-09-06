import { editItem } from "@/app/_lib/data-actions";
import {
  fetchAllCategories,
  fetchAllItemsAsOptions,
  fetchItem,
} from "@/app/_lib/data-fetches";
import PageTemplate from "@/app/_ui/general/page-template";
import ItemForm from "@/app/_ui/item/item-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Item Edit",
};

export default async function Page({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);

  if (!item) notFound();

  const [items, categories] = await Promise.all([
    fetchAllItemsAsOptions(),
    fetchAllCategories(),
  ]);

  const editItemWithId = editItem.bind(null, params.id);

  return (
    <PageTemplate title={"Edit " + item.name}>
      <ItemForm
        defaultValue={item}
        action={editItemWithId}
        otherItems={items}
        categories={categories}
      ></ItemForm>
    </PageTemplate>
  );
}
