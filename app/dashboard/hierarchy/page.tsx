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
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:[grid-template-columns:minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <h1 className="mb-6 text-2xl font-light">Root items:</h1>
          <ItemsGrid items={rootItems}></ItemsGrid>
        </div>
        <div>
          <h1 className="mb-6 text-2xl font-light">Item hierarchy:</h1>
          <ItemsTree items={itemsTree}></ItemsTree>
        </div>
      </div>
    </PageTemplate>
  );
}
