import { Metadata } from "next";
import {
  fetchAllFavoriteItems,
  fetchDashboardStatistics,
} from "../_lib/data-fetches";
import ItemCard from "../_ui/item-card";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const [stats, items] = await Promise.all([
    fetchDashboardStatistics(),
    fetchAllFavoriteItems(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-light mb-6">Dashboard</h1>
      <div className="flex flex-wrap gap-6 text-lg font-light">
        <div className="default-border p-4">
          <h1 className="text-xl mb-2">Quick stats:</h1>
          <table>
            <tbody>
              <tr>
                <td>Items:</td>
                <td>{stats.item_count}</td>
              </tr>
              <tr>
                <td>Images:</td>
                <td>{stats.image_count}</td>
              </tr>
              <tr>
                <td>Favorites:</td>
                <td>{stats.favorite_count}</td>
              </tr>
              <tr>
                <td className="pr-4">Categories:</td>
                <td>{stats.category_count}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {items.map((item) => (
          <ItemCard item={item}></ItemCard>
        ))}

        {items.length == 0 && (
          <div className="default-border aspect-square p-4 text-center">
            Your favorite items <br></br> will display here.
          </div>
        )}
      </div>
    </div>
  );
}
