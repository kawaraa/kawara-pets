"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AppSessionContext } from "../../../../app/app-session-context";

export function DeleteItemButton({ variantId }) {
  const { cart, updateCart } = useContext(AppSessionContext);

  const handleDelete = () => {
    updateCart(cart.filter((item) => item.variantId != variantId));
  };

  return (
    <form>
      <button
        type="submit"
        onClick={handleDelete}
        aria-label="Remove cart item"
        className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200">
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
    </form>
  );
}
