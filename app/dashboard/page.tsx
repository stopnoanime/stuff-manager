import { Metadata } from "next";
import {
  fetchAllFavoriteItems,
  fetchDashboardStatistics,
} from "../_lib/data-fetches";
import QuickStats from "../_ui/dashboard/quick-stats";
import PageTemplate from "../_ui/general/page-template";
import ItemCard from "../_ui/item/item-card";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const [stats, items] = await Promise.all([
    fetchDashboardStatistics(),
    fetchAllFavoriteItems(),
  ]);

  return (
    <PageTemplate title="Dashboard" fullWidth>
      <div className="grid gap-2 md:gap-4 grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]">
        <QuickStats stats={stats}></QuickStats>

        {items.map((item) => (
          <ItemCard key={item.id} item={item}></ItemCard>
        ))}

        {items.length == 0 && (
          <div className="default-border p-4 text-center">
            Your favorite items will display here.
          </div>
        )}
      </div>
    </PageTemplate>
  );
}
