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
        <div className="mb-6 flex gap-4 overflow-auto whitespace-nowrap p-1 text-xl font-light md:text-2xl">
          <h1 className="single-line-display min-w-20 grow">{title}</h1>
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
