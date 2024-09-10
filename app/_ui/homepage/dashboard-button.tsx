import { auth, signIn } from "@/auth";
import Link from "next/link";

export default async function GoToDashboardButton() {
  const session = await auth();

  if (!session)
    return (
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <button className="black-button text-lg">Sign in</button>
      </form>
    );

  return (
    <Link className="black-button text-lg" href="/dashboard">
      {" "}
      Go to dashboard{" "}
    </Link>
  );
}
