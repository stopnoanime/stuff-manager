import { Item } from "@/app/_lib/data-definitions";
import Link from "next/link";
import Image from "next/image";
import noImage from "@/public/no-image.png";

export default function ItemsGrid({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-wrap gap-4  text-center">
      {items.map((item) => (
        <div key={item.id} className="default-border p-2">
          <Image
            className="h-[135px] object-contain mb-2"
            width={240}
            height={135}
            src={item.image_url || noImage}
            alt="Item image"
          />
          <Link
            href={`/dashboard/items/${item.id}`}
            className="link text-lg mt-8 "
          >
            {item.name}
          </Link>
        </div>
      ))}
      {items.length === 0 && (
        <div className="w-full font-light text-lg pt-4">No items</div>
      )}
    </div>
  );
}
