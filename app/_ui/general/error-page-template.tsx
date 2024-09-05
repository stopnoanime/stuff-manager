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
    <div className="grid place-items-center min-h-full">
      <div className="text-center">
        <h1 className="text-xl mb-4">{text}</h1>
        <Link href={linkHref} className="link">
          {linkText}
        </Link>
      </div>
    </div>
  );
}
