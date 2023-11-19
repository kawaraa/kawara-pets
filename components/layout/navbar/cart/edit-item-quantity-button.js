"use client";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useContext } from "react";
import { AppSessionContext } from "../../../../app/app-session-context";

export function EditItemQuantityButton({ type, variantId }) {
  const { cart, lang, updateCart, addMessage } = useContext(AppSessionContext);

  const handleDelete = (e) => {
    e.preventDefault();
    const newCart = [...cart];
    const index = cart.findIndex((item) => item.variantId == variantId);
    let qty = newCart[index].quantity + 0; // Store the value to unlink the variable reference;
    qty += type === "plus" ? +1 : -1;
    if (qty < 1) {
      updateCart(cart.filter((item) => item.variantId != variantId));
    } else if (newCart[index].maxQuantity < qty) {
      addMessage({ type: "warning", text: content.maxQuantity[lang], duration: 5 });
    } else {
      newCart[index].quantity = qty;
      updateCart(newCart);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        aria-label={type === "plus" ? "Increase item quantity" : "Reduce item quantity"}
        className={clsx(
          "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
          {
            "ml-auto": type === "minus",
          }
        )}>
        {type === "plus" ? (
          <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
        ) : (
          <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
        )}
      </button>
    </form>
  );
}

const content = {
  maxQuantity: {
    en: "The maximum quantity of the product is ( 1 )",
    ar: "الحد الأقصى لكمية المنتج هو ( 1 )",
  },
};
