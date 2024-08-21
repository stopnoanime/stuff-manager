import { Metadata } from 'next';
import { fetchItem } from '@/app/_lib/data-fetches';
import { notFound } from 'next/navigation';
import ItemForm from '@/app/_ui/items/item-form';
import { editItem } from '@/app/_lib/data-actions';

export const metadata: Metadata = {
  title: 'Item Edit',
};

export default async function Page({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);
  const editItemWithId = editItem.bind(null, params.id)

  if(!item)
    notFound();

  return (
    <div>
      <ItemForm defaultValue={item} action={editItemWithId}></ItemForm>
    </div>
  );
}
