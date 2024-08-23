import { Metadata } from 'next';
import { fetchItem } from '@/app/_lib/data-fetches';
import { notFound } from 'next/navigation';
import ItemForm from '@/app/_ui/items/item-form';
import Link from 'next/link';
import { deleteItem } from '@/app/_lib/data-actions';

export const metadata: Metadata = {
  title: 'Item Info',
};

export default async function Page({ params }: { params: { id: string } }) {
  const item = await fetchItem(params.id);
  const deleteItemWithId = deleteItem.bind(null, params.id)

  if(!item)
    notFound();

  return (
    <div>
      <h1 className="text-4xl font-light mb-6">
        {item.name}
      </h1>
      <div className='max-w-[70vw] mx-auto'>
        <ItemForm readonly defaultValue={item}></ItemForm>
        
        <Link href={params.id + '/edit'}>Edit Item</Link>
        <form action={deleteItemWithId}>
          <button>Delete item</button>
        </form>
      </div>
    </div>
  );
}
