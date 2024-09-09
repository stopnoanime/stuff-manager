import { Item } from "@/app/_lib/data-definitions";
import ItemCard from "../item/item-card";

export default function ItemsGrid({ items }: { items: Item[] }) {
  if (items.length === 0)
    return <div className="font-light text-lg pt-4 text-center">No items</div>;

  return (
    <div className="grid gap-2 md:gap-4 grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]">
      {items.map((item) => (
        <ItemCard key={item.id} item={item}></ItemCard>
      ))}
    </div>
  );
}
