import Menu from "../_ui/menu";
import SearchBar from "../_ui/search-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen [grid-template:'menu_search'auto'menu_main'1fr/auto_1fr]">
      <div className="[grid-area:menu]">
        <Menu />
      </div>
      <SearchBar />
      <main className="p-6 overflow-auto">{children}</main>
    </div>
  );
}
