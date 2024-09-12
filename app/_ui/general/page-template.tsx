import Link from "next/link";

export default function PageTemplate({
  title,
  links,
  nodes,
  children,
  fullWidth,
}: {
  title?: string;
  links?: { href: string; text: string }[];
  nodes?: React.ReactNode[];
  children?: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div>
      {title && (
        <div className="flex text-xl md:text-2xl font-light mb-6 overflow-auto whitespace-nowrap gap-4 p-1">
          <h1 className="grow single-line-display min-w-20">{title}</h1>
          {links && (
            <div className="flex gap-4 md:gap-12">
              {links.map((l) => (
                <Link className="link" href={l.href} key={l.href}>
                  {l.text}
                </Link>
              ))}
              {nodes}
            </div>
          )}
        </div>
      )}

      <div className={"mx-auto" + (!fullWidth && " md:max-w-[70vw]")}>
        {children}
      </div>
    </div>
  );
}
