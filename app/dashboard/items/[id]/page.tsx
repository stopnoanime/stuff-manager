import { Metadata } from "next";
import { fetchChildItems, fetchItem } from "@/app/_lib/data-fetches";
import { notFound } from "next/navigation";
import Link from "next/link";
import ItemDisplay from "@/app/_ui/items/item-display";
import ItemDelete from "@/app/_ui/items/item-delete";
import ItemsList from "@/app/_ui/items/items-list";

export const metadata: Metadata = {
  title: "Item Info",
};

export default async function Page({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);

  if (!item) notFound();

  const childItems = await fetchChildItems(params.id);

  return (
    <div>
      <div className="flex justify-between text-2xl font-light mb-6">
        <h1>{item.name}</h1>
        <div className="flex gap-12">
          <Link className="link" href={params.id + "/edit"}>
            Edit item
          </Link>
          <ItemDelete id={item.id} />
        </div>
      </div>
      <div className="max-w-[70vw] mx-auto">
        <ItemDisplay item={item}></ItemDisplay>
      </div>

      {childItems.length != 0 && (
        <>
          <h1 className="text-2xl font-light mb-2 mt-12">Children</h1>
          <div className="max-w-[70vw] mx-auto mb-12">
            <ItemsList items={childItems}></ItemsList>
          </div>
        </>
      )}
    </div>
  );
}
