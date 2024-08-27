import {
  fetchAllItemsAsTree,
  fetchAllRootItems,
} from "@/app/_lib/data-fetches";
import ItemsGrid from "@/app/_ui/hierarchy/items-grid";
import ItemsTree from "@/app/_ui/hierarchy/items-tree";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Item hierarchy",
};

export default async function Page() {
  const [itemsTree, rootItems] = await Promise.all([
    fetchAllItemsAsTree(),
    fetchAllRootItems(),
  ]);

  return (
    <div
      className="max-w-[70vw] mx-auto grid gap-12"
      style={{ gridTemplateColumns: "1fr 1fr" }}
    >
      <div>
        <h1 className="text-2xl font-light mb-6 -ml-12">Item hierarchy</h1>
        <ItemsTree items={itemsTree}></ItemsTree>
      </div>
      <div>
        <h1 className="text-2xl font-light mb-6 -ml-12">Root items</h1>
        <ItemsGrid items={rootItems}></ItemsGrid>
      </div>
    </div>
  );
}
