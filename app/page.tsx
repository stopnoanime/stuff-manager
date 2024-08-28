import { auth, signIn } from "@/auth";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  return (
    <main className="min-h-screen grid place-items-center p-8">
      <h1 className="text-4xl"> Home Page </h1>
      {!!session && (
        <Link className="link text-lg" href="/dashboard">
          {" "}
          Go to dashboard{" "}
        </Link>
      )}
      {!session && (
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
        >
          <button className="link text-lg">Sign in</button>
        </form>
      )}
    </main>
  );
}
