import { signOut } from "next-auth/react";
import Link from "next/link";
import MenuButton from "./menu-button";
import {
  faPowerOff,
  faHouse,
  faList,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";

const links = [
  { text: "Dashboard", segment: "", icon: faHouse },
  { text: "All items", segment: "items", icon: faList },
  { text: "Item hierarchy", segment: "hierarchy", icon: faSitemap },
];

export default function Menu() {
  return (
    <div className="flex border-stone-900 border-solid w-full border-b overflow-x-auto md:flex-col md:border-b-0 md:border-r md:h-full md:w-40">
      <Link
        className="bg-stone-900 text-stone-50 text-2xl font-light p-4 flex items-center"
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

      <div className="grow min-w-2 min-h-2"></div>
      <MenuButton
        text="Sign out"
        icon={faPowerOff}
        onClick={signOut}
        isLast
      ></MenuButton>
    </div>
  );
}
