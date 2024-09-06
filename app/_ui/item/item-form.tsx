"use client";

import { ItemWithParent, SelectOptions } from "@/app/_lib/data-definitions";
import { FormEvent, startTransition, useActionState, useId } from "react";
import Select, { StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import ImageInput from "../general/image-input";
import { QRCodeInput } from "../qrcode/qrcode-input";

export type ItemFormState = {
  errors?: {
    name?: string[];
    image?: string[];
  };
  message?: string | null;
};

export default function ItemForm({
  defaultValue,
  action,
  categories,
  otherItems,
}: {
  defaultValue?: ItemWithParent;
  action: (prev: ItemFormState, d: FormData) => Promise<ItemFormState>;
  categories: string[];
  otherItems: SelectOptions;
}) {
  const [actionState, formAction] = useActionState(action, {});

  const defaultCategory = defaultValue?.category
    ? { label: defaultValue.category, value: defaultValue.category }
    : null;
  const defaultParent = defaultValue?.parent_item_id
    ? {
        label: defaultValue.parent_item_name,
        value: defaultValue.parent_item_id,
      }
    : null;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 ">
      <ImageInput
        defaultImage={defaultValue?.image_url}
        errors={actionState.errors?.image}
      />

      <textarea
        className="textarea"
        name="description"
        defaultValue={defaultValue?.description}
        placeholder="Item Description"
      />

      <textarea
        name="location_description"
        className="md:col-start-2 md:row-span-5 textarea"
        defaultValue={defaultValue?.location_description}
        placeholder="Item Location Description"
      />

      <label className="md:row-start-2">
        Name
        <input
          type="text"
          name="name"
          className="styled-input"
          defaultValue={defaultValue?.name}
          aria-describedby="name-errors"
          placeholder="Item Name"
        ></input>
        <p id="name-errors" className="text-red-500 text-sm">
          {actionState?.errors?.name?.map((e) => <span key={e}>{e}</span>)}
        </p>
      </label>

      <fieldset>
        <legend>Favorite</legend>

        <div className="styled-input flex justify-evenly">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="is_favorite"
              value="true"
              defaultChecked={defaultValue?.is_favorite}
            />
            True
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="is_favorite"
              value="false"
              defaultChecked={!defaultValue?.is_favorite}
            />
            False
          </label>
        </div>
      </fieldset>

      <label>
        Category
        <CreatableSelect
          instanceId={useId()}
          styles={selectStyles}
          name="category"
          placeholder="None"
          isClearable
          defaultValue={defaultCategory}
          options={categories.map((c) => ({ label: c, value: c }))}
        />
      </label>

      <label>
        Parent item
        <Select
          instanceId={useId()}
          styles={selectStyles}
          name="parent_item_id"
          placeholder="None"
          isClearable
          defaultValue={defaultParent}
          options={otherItems}
        />
      </label>

      <QRCodeInput default_qr_code={defaultValue?.qr_code} />

      <div className="md:col-span-2 text-sm text-red-500">
        {actionState?.message && <p>{actionState.message}</p>}
      </div>

      <button className="md:col-span-2 px-6 py-2 bg-stone-900 text-stone-50 focus-outline outline-offset-2">
        {defaultValue ? "Edit" : "Create"}
      </button>
    </form>
  );
}

const selectStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    transition: "none",
    border: "1px solid #0f172a !important",
    borderRadius: 0,
    outline: "2px #0f172a " + (state.isFocused ? "solid" : ""),
    boxShadow: "none",
    backgroundColor: "#fafaf9",
  }),
  menu: (base, state) => ({
    ...base,
    outline: "2px #0f172a solid",
    border: "1px solid #0f172a !important",
    borderRadius: 0,
    boxShadow: "none",
    backgroundColor: "#fafaf9",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#1c1917"
      : state.isFocused
        ? "#d6d3d1"
        : "transparent",
  }),
  menuList: (base, state) => ({
    ...base,
    padding: 0,
  }),
  placeholder: (base, state) => ({
    ...base,
    color: "#a8a29e",
  }),
};
