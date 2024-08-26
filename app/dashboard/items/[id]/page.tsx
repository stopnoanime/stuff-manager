import { Metadata } from "next";
import { fetchItem } from "@/app/_lib/data-fetches";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteItem } from "@/app/_lib/data-actions";
import ItemDisplay from "@/app/_ui/items/item-display";
import { useActionState } from "react";
import ItemDelete from "@/app/_ui/items/item-delete";

export const metadata: Metadata = {
  title: "Item Info",
};

export default async function Page({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);

  if (!item) notFound();

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
    </div>
  );
}
