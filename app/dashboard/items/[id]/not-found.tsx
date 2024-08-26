import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-items-center min-h-full">
      <div className="text-center">
        <h1 className="text-xl mb-4">Could not find item with given ID.</h1>
        <Link href="/dashboard/items" className="link">
          Return to item list
        </Link>
      </div>
    </div>
  );
}
