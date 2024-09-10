import { Item } from "@/app/_lib/data-definitions";
import noImage from "@/public/no-image.svg";
import Image from "next/image";
import Link from "next/link";

export default function ItemsList({ items }: { items: Item[] }) {
  return (
    <table className="w-full items-table text-center">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Category</th>
          <th>Description</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <Link className="link" href={`/dashboard/items/${item.id}`}>
                {item.name}
              </Link>
            </td>
            <td>
              <div className="relative h-full">
                <Image
                  className="object-contain"
                  src={item.image_url || noImage}
                  fill
                  sizes="10vw"
                  alt="Item image"
                />
              </div>
            </td>
            <td>{item.category || "-"}</td>
            <td>{item.description || "-"}</td>
            <td>{item.is_favorite ? "True" : "-"}</td>
          </tr>
        ))}
        {!items.length && (
          <tr>
            <td colSpan={5} className="font-light text-lg !pt-6">
              No Items
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
