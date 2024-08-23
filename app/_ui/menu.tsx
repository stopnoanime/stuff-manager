import Link from "next/link";

export default function Menu() {
  const links = [
    { href: "/dashboard", text: "Dashboard" },
    { href: "/todo", text: "Item hierarchy" },
    { href: "/dashboard/items", text: "All items" },
  ];

  return (
    <div className="flex flex-col border-stone-900 border-solid border-r h-full w-48">
      <div className="bg-stone-900 text-stone-50 text-2xl font-light p-4">
        Stuff
      </div>

      {links.map((l) => (
        <Link
          className="text-lg font-light p-4 border-b border-stone-900"
          key={l.href}
          href={l.href}
        >
          {l.text}
        </Link>
      ))}

      <div className="mt-auto font-light p-4 border-t border-stone-900">
        Sign Out
      </div>
    </div>
  );
}
