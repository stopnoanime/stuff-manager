import { Item } from "@/app/_lib/data-definitions";
import ItemCard from "../item-card";

export default function ItemsGrid({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-wrap gap-8">
      {items.map((item) => (
        <ItemCard key={item.id} item={item}></ItemCard>
      ))}
      {items.length === 0 && (
        <div className="w-full font-light text-lg pt-4 text-center">
          No items
        </div>
      )}
    </div>
  );
}
