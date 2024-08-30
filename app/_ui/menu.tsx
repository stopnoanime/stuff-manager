"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const links = [
  { text: "Dashboard", segment: "" },
  { text: "All items", segment: "items" },
  { text: "Item hierarchy", segment: "hierarchy" },
];

export default function Menu() {
  const segment = useSelectedLayoutSegment();

  function isSelected(linkSegment: string, currentSegment: string | null) {
    if (linkSegment == "" && currentSegment == null) return true;

    return linkSegment == currentSegment;
  }

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
          className={
            "text-lg font-light p-4 border-b border-stone-900 " +
            (isSelected(l.segment, segment) ? "font-normal" : "")
          }
          key={l.segment}
          href={"/dashboard/" + l.segment}
        >
          {l.text}
        </Link>
      ))}

      <button
        className="mt-auto font-light p-4 border-t border-stone-900 text-left"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
