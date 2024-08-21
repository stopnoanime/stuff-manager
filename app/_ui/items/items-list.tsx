import { ItemsTable } from "@/app/_lib/data-definitions";
import Image from 'next/image'
import noImage from '@/public/no-image.png'
import "./items-list.css"
import Link from "next/link";

export default function ItemsList(
    {items} : {items : ItemsTable[]}
) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => 
                <tr key={item.id} className="h-12">
                    <td><Link href={`/dashboard/items/${item.id}`}>{item.name}</Link></td>
                    <td>{item.category}</td>
                    <td className="relative">
                        <Image
                            className="object-contain"
                            src={item.image_url || noImage}
                            fill
                            sizes="10vw"
                            alt="Item image"
                        />
                    </td>
                    <td>{item.description}</td>
                </tr>
                )}
            </tbody>
        </table>
    )
}