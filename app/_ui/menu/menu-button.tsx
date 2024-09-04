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
  const isSelected = segment
    ? segment === (useSelectedLayoutSegment() || "")
    : false;

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
        "font-light p-2 border-r border-stone-900 md:p-4 md:border-r-0 md:border-b" +
        (isSelected ? " font-medium md:font-normal" : "") +
        (isLast ? " border-l border-r-0 md:border-t border-b-0" : "")
      }
      href={"/dashboard/" + segment}
      onClick={onClick}
    >
      <div className="flex flex-col justify-center gap-2 h-full text-center md:items-start">
        <FontAwesomeIcon icon={icon} className="md:!hidden" size="lg" />
        <div className="text-xs md:text-lg ">{text}</div>
      </div>
    </LinkOrButton>
  );
}
