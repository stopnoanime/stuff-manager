import { ItemWithParent } from "@/app/_lib/data-definitions";
import noImage from "@/public/no-image.svg";
import Image from "next/image";
import Link from "next/link";
import QRCodeDisplay from "../qrcode/qrcode-display";

export default function ItemDisplay({ item }: { item: ItemWithParent }) {
  const placeholderColor = (v: string | null) => (v ? "" : " text-stone-400");

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="styled-input">
        <div className="relative aspect-video">
          <Image
            className="object-contain"
            src={item.image_url || noImage}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            alt="Item image"
          />
        </div>
      </div>

      <div
        className={"textarea div-textarea" + placeholderColor(item.description)}
      >
        {item.description || "Item Description"}
      </div>

      <div
        className={
          "textarea div-textarea md:col-start-2 md:row-span-5" +
          placeholderColor(item.location_description)
        }
      >
        {item.location_description || "Item Location Description"}
      </div>

      <div className="md:row-start-2">
        Name
        <div className="styled-input single-line-display">{item.name}</div>
      </div>
      <div>
        Favorite
        <div className={"styled-input"}>
          {item.is_favorite ? "True" : "False"}
        </div>
      </div>

      <div>
        Category
        <div
          className={
            "styled-input single-line-display" + placeholderColor(item.category)
          }
        >
          {item.category || "None"}
        </div>
      </div>

      <div>
        Parent item
        <div
          className={
            "styled-input single-line-display" +
            placeholderColor(item.parent_item_id)
          }
        >
          {item.parent_item_id ? (
            <Link
              className="link"
              href={`/dashboard/items/${item.parent_item_id}`}
            >
              {item.parent_item_name}
            </Link>
          ) : (
            "None"
          )}
        </div>
      </div>

      <div>
        QR code
        <QRCodeDisplay qr_code={item.qr_code}></QRCodeDisplay>
      </div>
    </div>
  );
}
