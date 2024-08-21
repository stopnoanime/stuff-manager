import { createItem } from '@/app/_lib/data-actions';
import ItemForm from '@/app/_ui/items/item-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Item',
};

export default async function Page() {
  return (
    <div>
      <ItemForm action={createItem}></ItemForm>
    </div>
  );
}
