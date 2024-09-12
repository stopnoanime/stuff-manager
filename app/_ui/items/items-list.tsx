import { Item } from "@/app/_lib/data-definitions";
import noImage from "@/public/no-image.svg";
import Image from "next/image";
import Link from "next/link";

export default function ItemsList({ items }: { items: Item[] }) {
  return (
    <div className="overflow-auto">
      <table className="items-table w-full text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th className="hidden md:table-cell">Description</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="single-line-display">
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
                    sizes="(max-width: 768px) 25vw, 10vw"
                    alt="Item image"
                  />
                </div>
              </td>
              <td className="single-line-display">{item.category || "-"}</td>
              <td className="single-line-display hidden md:table-cell">
                {item.description || "-"}
              </td>
              <td className="single-line-display">
                {item.is_favorite ? "True" : "-"}
              </td>
            </tr>
          ))}
          {!items.length && (
            <tr>
              <td colSpan={5} className="!pt-6 text-lg font-light">
                No Items
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
