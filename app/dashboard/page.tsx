import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <main>
      <h1 className="text-xl md:text-2xl">
        Dashboard
      </h1>
    </main>
  );
}
