import { Metadata } from 'next';
import { fetchItem } from '@/app/_lib/data-fetches';
import { notFound } from 'next/navigation';
import ItemForm from '@/app/_ui/items/item-form';

export const metadata: Metadata = {
  title: 'Item Info',
};

export default async function Page({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);

  if(!item)
    notFound();

  return (
    <div>
      <ItemForm readonly defaultValue={item}></ItemForm>
    </div>
  );
}
