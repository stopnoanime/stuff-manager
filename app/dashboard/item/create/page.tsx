import { createItem } from '@/app/_lib/data-actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Item',
};

export default async function Page() {
  return (
    <div>
      <form action={createItem}>

        <label>
          Parent item
          <input 
            type='text'
            name='parent_item_id'
          ></input>
        </label>

        <label>
          Name
          <input 
            type='text'
            name='name'
            required
          ></input>
        </label>

        <label>
          Category
          <input 
            type='text'
            name='category'
          ></input>
        </label>

        <label>
          Image URL
          <input 
            type='text'
            name='image_url'
          ></input>
        </label>

        <label>
          Description
          <input 
            type='text'
            name='description'
          ></input>
        </label>

        <label>
          Location Description
          <input 
            type='text'
            name='location_description'
          ></input>
        </label>

        <button>
          Create
        </button>
      </form>
    </div>
  );
}
