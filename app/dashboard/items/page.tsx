import { createItem } from '@/app/_lib/data-actions';
import { fetchItems } from '@/app/_lib/data-fetches';
import ItemsList from '@/app/_ui/items/items-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Items',
};

export default async function Page() {
    const items = await fetchItems();

  return (
    <div>
      <ItemsList items={items}></ItemsList>
    </div>
  );
}
