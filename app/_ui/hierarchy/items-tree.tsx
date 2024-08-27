import { ItemWithPath } from "@/app/_lib/data-definitions";
import Link from "next/link";

export default function ItemsTree({ items }: { items: ItemWithPath[] }) {
  return (
    <ul className="list-disc">
      {items.map((item) => (
        <li key={item.id} style={{ marginLeft: item.depth * 20 }}>
          <Link href={`/dashboard/items/${item.id}`} className="link text-lg">
            {item.name}
          </Link>
        </li>
      ))}
      {items.length === 0 && (
        <div className="font-light text-lg pt-4">No items</div>
      )}
    </ul>
  );
}
