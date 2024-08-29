import { signOut } from "@/auth";
import Link from "next/link";

export default function Menu() {
  const links = [
    { href: "/dashboard", text: "Dashboard" },
    { href: "/dashboard/items", text: "All items" },
    { href: "/dashboard/scanner", text: "QR scanner" },
    { href: "/dashboard/hierarchy", text: "Item hierarchy" },
  ];

  return (
    <div className="flex flex-col border-stone-900 border-solid border-r h-full w-48">
      <Link
        className="bg-stone-900 text-stone-50 text-2xl font-light p-4"
        href="/"
      >
        Stuff
      </Link>

      {links.map((l) => (
        <Link
          className="text-lg font-light p-4 border-b border-stone-900"
          key={l.href}
          href={l.href}
        >
          {l.text}
        </Link>
      ))}

      <form
        className="mt-auto font-light p-4 border-t border-stone-900"
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
