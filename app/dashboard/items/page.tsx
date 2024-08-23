import { createItem } from "@/app/_lib/data-actions";
import { fetchAllItems } from "@/app/_lib/data-fetches";
import ItemsList from "@/app/_ui/items/items-list";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Items",
};

export default async function Page() {
  const items = await fetchAllItems();

  return (
    <div>
      <div className="flex justify-between text-2xl font-light mb-6">
        <h1>All Items</h1>
        <Link className="link" href={`/dashboard/items/create`}>
          Create item
        </Link>
      </div>
      <div className="max-w-[70vw] mx-auto">
        <ItemsList items={items}></ItemsList>
      </div>
    </div>
  );
}
