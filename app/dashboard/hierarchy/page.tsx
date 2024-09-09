import {
  fetchAllItemsAsTree,
  fetchAllRootItems,
} from "@/app/_lib/data-fetches";
import PageTemplate from "@/app/_ui/general/page-template";
import ItemsGrid from "@/app/_ui/items/items-grid";
import ItemsTree from "@/app/_ui/items/items-tree";
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
    <PageTemplate title="">
      <div className="grid gap-12 grid-cols-1 md:[grid-template-columns:2fr_1fr]">
        <div>
          <h1 className="text-2xl font-light mb-6">Root items:</h1>
          <ItemsGrid items={rootItems}></ItemsGrid>
        </div>
        <div>
          <h1 className="text-2xl font-light mb-6">Item hierarchy:</h1>
          <ItemsTree items={itemsTree}></ItemsTree>
        </div>
      </div>
    </PageTemplate>
  );
}
