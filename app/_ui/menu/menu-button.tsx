"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function MenuButton({
  text,
  segment,
  icon,
  onClick,
  isLast,
}: {
  text: string;
  segment?: string;
  icon: IconDefinition;
  onClick?: () => void;
  isLast?: boolean;
}) {
  const currentSegment = useSelectedLayoutSegment() || "";
  const isSelected = segment === currentSegment;

  function LinkOrButton(props: any) {
    const isButton = !!props.onClick;

    return isButton ? (
      <button {...{ ...props, href: undefined }}></button>
    ) : (
      <Link {...props}></Link>
    );
  }

  return (
    <LinkOrButton
      className={
        "focus-outline border-r border-stone-900 p-2 font-light md:border-b md:border-r-0 md:p-4" +
        (isSelected ? " font-medium md:font-normal" : "") +
        (isLast ? " border-b-0 border-l border-r-0 md:border-t" : "")
      }
      href={"/dashboard/" + segment}
      onClick={onClick}
    >
      <div className="flex h-full flex-col justify-center gap-2 text-center md:items-start">
        <FontAwesomeIcon icon={icon} className="md:!hidden" size="lg" />
        <div className="text-xs md:text-lg">{text}</div>
      </div>
    </LinkOrButton>
  );
}
