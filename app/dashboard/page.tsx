import { Metadata } from "next";
import {
  fetchAllFavoriteItems,
  fetchDashboardStatistics,
} from "../_lib/data-fetches";
import ItemCard from "../_ui/item/item-card";
import PageTemplate from "../_ui/general/page-template";
import QuickStats from "../_ui/dashboard/quick-stats";

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
      <div className="flex flex-wrap gap-6 text-lg font-light">
        <QuickStats stats={stats}></QuickStats>

        {items.map((item) => (
          <ItemCard key={item.id} item={item}></ItemCard>
        ))}

        {items.length == 0 && (
          <div className="default-border aspect-square p-4 text-center">
            Your favorite items <br></br> will display here.
          </div>
        )}
      </div>
    </PageTemplate>
  );
}
