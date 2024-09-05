import { fetchAllItems } from "@/app/_lib/data-fetches";
import PageTemplate from "@/app/_ui/general/page-template";
import ItemsList from "@/app/_ui/items/items-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All items",
};

export default async function Page() {
  const items = await fetchAllItems();

  return (
    <PageTemplate
      title="All items"
      links={[{ text: "Create item", href: "/dashboard/items/create" }]}
    >
      <ItemsList items={items}></ItemsList>
    </PageTemplate>
  );
}
