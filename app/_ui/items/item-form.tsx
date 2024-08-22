'use client'

import { ItemsTable } from "@/app/_lib/data-definitions";
import { useActionState } from "react";

export type ItemFormState = {
    errors?: {
      name?: string[];
    };
    message?: string | null;
};

export default function ItemForm(
    {readonly, defaultValue, action} : {readonly?: boolean, defaultValue? : ItemsTable, action?: (prev: ItemFormState, d: FormData) => Promise<ItemFormState>}
) {
    const [state, formAction] = action ? useActionState(action, {}) : [];

    return (
    <form action={formAction} className="flex flex-col gap-4">
        <label>
            Parent item
            <input 
                type='text'
                name='parent_item_id'
                defaultValue={defaultValue?.parent_item_id || ''}
                readOnly={readonly}
            ></input>
        </label>

        <label>
            Name
            <input 
                type='text'
                name='name'
                defaultValue={defaultValue?.name}
                readOnly={readonly}
                aria-describedby="name-errors"
            ></input>
        </label>
        <div id="name-errors">
            {state?.errors?.name?.map(e => 
                <p className="text-red-500" key={e}>
                    {e}
                </p>
            )}
        </div>

        <label>
            Category
            <input 
                type='text'
                name='category'
                defaultValue={defaultValue?.category}
                readOnly={readonly}
            ></input>
        </label>

        <label>
            Image URL
            <input 
                type='text'
                name='image_url'
                defaultValue={defaultValue?.image_url}
                readOnly={readonly}
            ></input>
        </label>

        <label>
            Description
            <input 
                type='text'
                name='description'
                defaultValue={defaultValue?.description}
                readOnly={readonly}
            ></input>
        </label>

        <label>
            Location Description
            <input 
                type='text'
                name='location_description'
                defaultValue={defaultValue?.location_description}
                readOnly={readonly}
            ></input>
        </label>
        
        <div>
          {state?.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>

        {!readonly && 
            <button>
                {defaultValue ? 'Edit' : 'Create'}
            </button>
        }
    </form>
    )
}