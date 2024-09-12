import SearchBar from "../_ui/dashboard/search-bar";
import Menu from "../_ui/menu/menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen [grid-template:'menu'auto'search'auto'main'1fr] md:h-screen md:[grid-template:'menu_search'auto'menu_main'1fr/auto_1fr]">
      <div className="overflow-hidden [grid-area:menu]">
        <Menu />
      </div>
      <div className="[grid-area:search]">
        <SearchBar />
      </div>
      <main className="overflow-auto p-2 [grid-area:main] md:p-6">
        {children}
      </main>
    </div>
  );
}
