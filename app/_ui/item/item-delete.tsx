"use client";

import { deleteItem } from "@/app/_lib/data-actions";
import { useActionState } from "react";

export type ItemDeleteState = {
  message?: string;
};

export default function ItemDelete({ id }: { id: string }) {
  const [actionState, formAction] = useActionState(
    deleteItem.bind(null, id),
    {},
  );

  return (
    <form action={formAction}>
      <button className="link">Delete item</button>
      <div className="col-span-2 text-sm text-red-500">
        {actionState.message && <p>{actionState.message}</p>}
      </div>
    </form>
  );
}
