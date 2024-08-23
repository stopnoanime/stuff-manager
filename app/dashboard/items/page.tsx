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
      <h1 className="text-4xl font-light mb-6">
        All Items
      </h1>
      <div className='max-w-[70vw] mx-auto'>
        <ItemsList items={items}></ItemsList>
      </div>
    </div>
  );
}
