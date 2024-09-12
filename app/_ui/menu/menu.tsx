import {
  faHouse,
  faList,
  faPowerOff,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import MenuButton from "./menu-button";

const links = [
  { text: "Dashboard", segment: "", icon: faHouse },
  { text: "All items", segment: "items", icon: faList },
  { text: "Item hierarchy", segment: "hierarchy", icon: faSitemap },
];

export default function Menu() {
  return (
    <div className="flex w-full overflow-x-auto border-b border-solid border-stone-900 md:h-full md:w-40 md:flex-col md:border-b-0 md:border-r">
      <Link
        className="focus-outline flex items-center bg-stone-900 p-4 text-2xl font-light text-stone-50 !ring-stone-50 ring-offset-2 !ring-offset-stone-900"
        href="/"
      >
        Stuff
      </Link>

      {links.map((l) => (
        <MenuButton
          segment={l.segment}
          text={l.text}
          icon={l.icon}
          key={l.segment}
        ></MenuButton>
      ))}

      <div className="min-h-2 min-w-2 grow"></div>
      <MenuButton
        text="Sign out"
        icon={faPowerOff}
        onClick={signOut}
        isLast
      ></MenuButton>
    </div>
  );
}
