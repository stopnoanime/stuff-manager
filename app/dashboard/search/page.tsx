import { fetchItemsByQRCode, fetchItemsByQuery } from "@/app/_lib/data-fetches";
import PageTemplate from "@/app/_ui/general/page-template";
import ItemsList from "@/app/_ui/item/items-list";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Search results",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    qr_code?: string;
  };
}) {
  const query = searchParams?.query || "";
  const qr_code = searchParams?.qr_code || "";

  const items = await (qr_code
    ? fetchItemsByQRCode(qr_code)
    : fetchItemsByQuery(query));

  if (items.length === 1) redirect("/dashboard/items/" + items[0].id);

  return (
    <PageTemplate title="Search results:">
      <ItemsList items={items}></ItemsList>
    </PageTemplate>
  );
}
