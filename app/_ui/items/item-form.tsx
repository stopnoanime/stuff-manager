"use client";

import { ItemWithParent } from "@/app/_lib/data-definitions";
import { useActionState, useId } from "react";
import CreatableSelect from "react-select/creatable";
import Select, { StylesConfig } from "react-select";
import Image from "next/image";
import noImage from "@/public/no-image.png";
import { SelectOptions } from "@/app/_lib/data-definitions";

export type ItemFormState = {
  errors?: {
    name?: string[];
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
  const [state, formAction] = useActionState(action, {});

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

  const defaultCategory = defaultValue?.category
    ? { label: defaultValue.category, value: defaultValue.category }
    : null;
  const defaultParent = defaultValue?.parent_item_id
    ? {
        label: defaultValue.parent_item_name,
        value: defaultValue.parent_item_id,
      }
    : null;

  return (
    <form action={formAction} className="grid grid-cols-2 gap-4 item-form">
      <div className="w-full aspect-video relative">
        <Image
          className="object-contain "
          src={defaultValue?.image_url || noImage}
          fill
          priority
          sizes="60vw"
          alt="Item image"
        />
      </div>
      <input
        hidden
        type="text"
        name="image_url"
        defaultValue={defaultValue?.image_url}
      ></input>

      <textarea
        className="textarea"
        name="description"
        defaultValue={defaultValue?.description}
        placeholder="Item Description"
      ></textarea>

      <label>
        Name
        <input
          type="text"
          name="name"
          className="styled-text-input"
          defaultValue={defaultValue?.name}
          aria-describedby="name-errors"
          placeholder="Item Name"
        ></input>
        <p id="name-errors">
          {state?.errors?.name?.map((e) => (
            <p className="text-red-500 text-sm" key={e}>
              {e}
            </p>
          ))}
        </p>
      </label>

      <textarea
        name="location_description"
        className="col-start-2 row-span-3 textarea"
        defaultValue={defaultValue?.location_description}
        placeholder="Item Location Description"
      ></textarea>

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

      <div className="col-span-2">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </div>

      <button className="col-span-2 px-6 py-2 bg-stone-900 text-stone-50 focus-outline outline-offset-2">
        {defaultValue ? "Edit" : "Create"}
      </button>
    </form>
  );
}
