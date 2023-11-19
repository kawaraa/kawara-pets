"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { AppSessionContext } from "../../app-session-context";
import { btnCls, disabledBtnCls } from "../../../components/layout/tailwindcss-class";

export function AddToCart({ lang, product }) {
  const { cart, updateCart, setIsCartOpen } = useContext(AppSessionContext);
  const searchParams = useSearchParams();

  const variant = product.variants.find((variant) =>
    variant.options.every((option) => option.value === searchParams.get(option.name.toLowerCase()))
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      imageUrl: variant.imageUrl || product.images[0],
      options: variant.options,
      price: variant.price,
      quantity: 1,
      maxQuantity: product.meta.maxQuantity,
    };
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.variantId == newItem.variantId);
    if (index < 0) newCart.push(newItem);
    else newCart[index].quantity += newItem.quantity;
    updateCart(newCart);
    setIsCartOpen(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton lang={lang} availableForSale={variant?.quantity > 0} selectedVariantId={variant?.id} />
    </form>
  );
}

function SubmitButton({ lang, availableForSale, selectedVariantId }) {
  if (!selectedVariantId) {
    return (
      <button
        type="submit"
        aria-label="Please select an option"
        aria-disabled
        className={clsx(btnCls, disabledBtnCls, "w-full")}>
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        {content.add[lang]}
      </button>
    );
  }

  if (!availableForSale) {
    return (
      <button type="submit" aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        {content.stockedOut[lang]}
      </button>
    );
  }

  return (
    <button
      type="submit"
      aria-label="Add to cart"
      className={clsx(btnCls, "w-full", { "hover:opacity-90": true })}>
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      {content.add[lang]}
    </button>
  );
}

const content = {
  add: { en: "Add To Cart", ar: "أضف إلى السلة" },
  stockedOut: { en: "Out Of Stock", ar: "إنتهى من المخزن" },
};
