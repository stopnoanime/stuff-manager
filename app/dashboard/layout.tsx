import Menu from "../_ui/menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <Menu />
      <main className="grow p-6 overflow-auto">{children}</main>
    </div>
  );
}
