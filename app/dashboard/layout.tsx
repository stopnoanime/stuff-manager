import SearchBar from "../_ui/dashboard/search-bar";
import Menu from "../_ui/menu/menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen md:h-screen [grid-template:'menu'auto'search'auto'main'1fr] md:[grid-template:'menu_search'auto'menu_main'1fr/auto_1fr]">
      <div className="[grid-area:menu] overflow-hidden">
        <Menu />
      </div>
      <div className="[grid-area:search]">
        <SearchBar />
      </div>
      <main className="[grid-area:main] p-2 md:p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
