import { ItemWithParent } from "@/app/_lib/data-definitions";
import noImage from "@/public/no-image.svg";
import Image from "next/image";
import Link from "next/link";
import QRCodeDisplay from "../qrcode/qrcode-display";

export default function ItemDisplay({ item }: { item: ItemWithParent }) {
  const placeholderColor = (v: string | null) => (v ? "" : " text-stone-400");

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="styled-input">
        <div className="aspect-video relative">
          <Image
            className="object-contain "
            src={item.image_url || noImage}
            fill
            priority
            sizes="60vw"
            alt="Item image"
          />
        </div>
      </div>

      <div className={"textarea" + placeholderColor(item.description)}>
        {item.description || "Item Description"}
      </div>

      <div
        className={
          "md:col-start-2 md:row-span-5 textarea" +
          placeholderColor(item.location_description)
        }
      >
        {item.location_description || "Item Location Description"}
      </div>

      <div className="md:row-start-2">
        Name
        <div className="styled-input">{item.name}</div>
      </div>
      <div>
        Favorite
        <div className={"styled-input"}>
          {item.is_favorite ? "True" : "False"}
        </div>
      </div>

      <div>
        Category
        <div className={"styled-input" + placeholderColor(item.category)}>
          {item.category || "None"}
        </div>
      </div>

      <div>
        Parent item
        <div className={"styled-input" + placeholderColor(item.parent_item_id)}>
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
