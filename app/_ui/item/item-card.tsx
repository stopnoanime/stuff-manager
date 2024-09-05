import { Item } from "../../_lib/data-definitions";
import Link from "next/link";
import Image from "next/image";
import noImage from "@/public/no-image.png";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div key={item.id} className="default-border p-2 text-center">
      <Link href={`/dashboard/items/${item.id}`} className="link text-lg">
        {item.name}
      </Link>
      <Image
        className="h-[140px] object-contain mt-2"
        width={210}
        height={140}
        src={item.image_url || noImage}
        alt="Item image"
      />
    </div>
  );
}
