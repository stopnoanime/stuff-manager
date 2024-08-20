import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center p-24">
      <Link href="/dashboard"> Go to dashboard </Link>
    </main>
  );
}
