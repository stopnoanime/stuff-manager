import { Item } from "@/app/_lib/data-definitions";
import ItemCard from "../item/item-card";

export default function ItemsGrid({ items }: { items: Item[] }) {
  if (items.length === 0)
    return <div className="pt-4 text-center text-lg font-light">No items</div>;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2 md:gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item}></ItemCard>
      ))}
    </div>
  );
}
