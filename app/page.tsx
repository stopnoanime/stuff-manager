import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <h1 className="text-4xl"> Home Page </h1>
      <Link className="link text-lg" href="/dashboard">
        {" "}
        Go to dashboard{" "}
      </Link>
    </main>
  );
}
