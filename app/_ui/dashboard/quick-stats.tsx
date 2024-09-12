import { DashboardStatistics } from "@/app/_lib/data-definitions";

export default function QuickStats({ stats }: { stats: DashboardStatistics }) {
  return (
    <div className="default-border p-4">
      <h1 className="mb-2 text-xl">Quick stats:</h1>
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
  );
}
