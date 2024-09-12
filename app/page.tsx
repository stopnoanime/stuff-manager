import Link from "next/link";
import GoToDashboardButton from "./_ui/homepage/dashboard-button";

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center p-8">
      <div className="text-center">
        <h1 className="mb-2 text-6xl"> Stuff </h1>
        <h2 className="text-xl"> A manager for all your stuff </h2>
      </div>

      <GoToDashboardButton></GoToDashboardButton>

      <div>
        <h2 className="mb-2 text-xl">Core features:</h2>
        <ul className="list-inside list-disc">
          <li>Item manager with relation support</li>
          <li>User auth using GitHub OAuth</li>
          <li>QR code based item retrieval</li>
          <li>Full text item search</li>
        </ul>
      </div>

      <footer className="link mt-auto text-sm">
        <Link href="https://github.com/stopnoanime/stuff-manager">
          View the source on GitHub
        </Link>
      </footer>
    </main>
  );
}
