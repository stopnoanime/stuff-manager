import { fetchItemsByQuery } from "@/app/_lib/data-fetches";
import ItemsList from "@/app/_ui/items/items-list";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const items = await fetchItemsByQuery(query);

  if (items.length === 1) redirect("/dashboard/items/" + items[0].id);

  return (
    <div>
      <h1 className="text-2xl font-light mb-6">Search results:</h1>
      <div className="max-w-[70vw] mx-auto">
        <ItemsList items={items}></ItemsList>
      </div>
    </div>
  );
}
