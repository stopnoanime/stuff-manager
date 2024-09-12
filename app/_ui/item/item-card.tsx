import noImage from "@/public/no-image.svg";
import Image from "next/image";
import Link from "next/link";
import { Item } from "../../_lib/data-definitions";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div
      key={item.id}
      className="default-border flex flex-col justify-evenly p-2 text-center"
    >
      <Link
        href={`/dashboard/items/${item.id}`}
        className="link single-line-display text-lg"
      >
        {item.name}
      </Link>
      <div className="relative mt-1 aspect-video">
        <Image
          className="object-contain"
          fill
          sizes="(max-width: 360px) 100vw, 50vw"
          src={item.image_url || noImage}
          alt="Item image"
        />
      </div>
    </div>
  );
}
