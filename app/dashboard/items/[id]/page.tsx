import { fetchChildItems, fetchItem } from "@/app/_lib/data-fetches";
import PageTemplate from "@/app/_ui/general/page-template";
import ItemDelete from "@/app/_ui/item/item-delete";
import ItemDisplay from "@/app/_ui/item/item-display";
import ItemsList from "@/app/_ui/items/items-list";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Item Info",
};

export default async function Page({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);

  if (!item) notFound();

  const childItems = await fetchChildItems(params.id);

  return (
    <>
      <PageTemplate
        title={item.name}
        links={[{ text: "Edit item", href: params.id + "/edit" }]}
        nodes={[<ItemDelete id={item.id} key={0} />]}
      >
        <ItemDisplay item={item}></ItemDisplay>
      </PageTemplate>

      {childItems.length != 0 && (
        <>
          <div className="h-6"></div>
          <PageTemplate title="Children">
            <ItemsList items={childItems}></ItemsList>
          </PageTemplate>
        </>
      )}
    </>
  );
}
