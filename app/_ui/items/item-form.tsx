import { ItemsTable } from "@/app/_lib/data-definitions";

export default function ItemForm(
    {readonly, defaultValue, action} : {readonly?: boolean, defaultValue? : ItemsTable, action?: (d: FormData) => void}
) {
    return (
    <form action={action} className="flex flex-col gap-4">
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
                required
                defaultValue={defaultValue?.name}
                readOnly={readonly}
            ></input>
        </label>

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
        
        {!readonly && 
            <button>
                {defaultValue ? 'Edit' : 'Create'}
            </button>
        }
    </form>
    )
}