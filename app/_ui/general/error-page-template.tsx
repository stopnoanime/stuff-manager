import Link from "next/link";

export default function ErrorPageTemplate({
  text,
  linkText,
  linkHref,
}: {
  text: string;
  linkText: string;
  linkHref: string;
}) {
  return (
    <div className="grid min-h-full place-items-center">
      <div className="text-center">
        <h1 className="mb-4 text-xl">{text}</h1>
        <Link href={linkHref} className="link">
          {linkText}
        </Link>
      </div>
    </div>
  );
}
