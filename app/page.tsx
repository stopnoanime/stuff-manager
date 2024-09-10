import Link from "next/link";
import GoToDashboardButton from "./_ui/homepage/dashboard-button";

export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="text-center">
        <h1 className="text-6xl mb-2"> Stuff </h1>
        <h2 className="text-xl"> A manager for all your stuff </h2>
      </div>

      <GoToDashboardButton></GoToDashboardButton>

      <div>
        <h2 className="text-xl mb-2">Core features:</h2>
        <ul className="list-disc list-inside">
          <li>Item manager with relation support</li>
          <li>User auth using GitHub OAuth</li>
          <li>QR code based item retrieval</li>
          <li>Full text item search</li>
        </ul>
      </div>

      <footer className="mt-auto text-sm link">
        <Link href="https://github.com/stopnoanime/stuff-manager">
          View the source on GitHub
        </Link>
      </footer>
    </main>
  );
}
