import noImage from "@/public/no-image.svg";
import Image from "next/image";
import Link from "next/link";
import { Item } from "../../_lib/data-definitions";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div
      key={item.id}
      className="default-border p-2 text-center flex flex-col justify-evenly"
    >
      <Link href={`/dashboard/items/${item.id}`} className="link text-lg">
        {item.name}
      </Link>
      <div className="relative aspect-video mt-1">
        <Image
          className="object-contain"
          fill
          src={item.image_url || noImage}
          alt="Item image"
        />
      </div>
    </div>
  );
}
