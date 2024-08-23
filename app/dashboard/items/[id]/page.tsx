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
      <div className='flex justify-between text-2xl font-light mb-6'>
        <h1>
        {item.name}
        </h1>
        <div className='flex gap-12'>
          <Link 
            className="link" 
            href={params.id + '/edit'}>
              Edit item
          </Link>
          <form action={deleteItemWithId}>
            <button className='link'>Delete item</button>
          </form>
        </div>
      </div>
      <div className='max-w-[70vw] mx-auto'>
        {/* <ItemForm defaultValue={item}></ItemForm> */}
      </div>
    </div>
  );
}
