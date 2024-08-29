import { fetchItemsByQRCode } from "@/app/_lib/data-fetches";
import ItemCard from "@/app/_ui/item-card";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { qr_code: string };
}) {
  const items = await fetchItemsByQRCode(params.qr_code);

  if (items.length === 1) redirect("/dashboard/items/" + items[0].id);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mt-4">
        {items.length
          ? `Found ${items.length} items.`
          : "Found no matching items."}
      </div>

      <div className="flex gap-6">
        {items.map((i) => (
          <ItemCard key={i.id} item={i}></ItemCard>
        ))}
      </div>
    </div>
  );
}
