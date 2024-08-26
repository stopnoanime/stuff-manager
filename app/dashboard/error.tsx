"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="grid place-items-center min-h-full">
      <div className="text-center">
        <h1 className="text-xl mb-4">Something went wrong!</h1>
        <Link href="/dashboard" className="link">
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
