import { ItemWithPath } from "@/app/_lib/data-definitions";
import Link from "next/link";

export default function ItemsTree({ items }: { items: ItemWithPath[] }) {
  if (items.length === 0)
    return <div className="font-light text-lg pt-4">No items</div>;

  return (
    <ul className="list-disc pl-4">
      {items.map((item) => (
        <li key={item.id} style={{ marginLeft: item.depth * 20 }}>
          <Link
            href={`/dashboard/items/${item.id}`}
            className="link text-lg block single-line-display"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
