"use client";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Price from "../../../price";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { AppSessionContext } from "../../../../app/app-session-context";
import { createUrl, validateError } from "../../../../service/utilities";
import { DeleteItemButton } from "./delete-item-button";
import clsx from "clsx";
import Transition from "../../transition";
import { request } from "../../../../service/request";
const taxPercentage = +process.env.NEXT_PUBLIC_TAX_PERCENTAGE || 0;

export default function CartModal({ lang }) {
  const { loading, currency, cart, isCartOpen, setIsCartOpen, addMessage } = useContext(AppSessionContext);
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalTaxAmount = (totalAmount / 100) * taxPercentage;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Information component > Shipping component > Payment component
  // Like the checkout page on "https://demo.vercel.store" demo
  const redirectToStripe = async (e) => {
    e.preventDefault();
    const lineItems = cart.map(({ productId, variantId, quantity }) => ({ productId, variantId, quantity }));
    const url = `/api/checkout?lang=${lang}&currency=${currency.code}&timezone=${
      Intl.DateTimeFormat().resolvedOptions().timeZone
    }`;
    const res = await request(url, "POST", { lineItems }).catch((e) => e);
    if (res?.message) addMessage("error", validateError(res.message, lang), 5);
    else window.location.href = res.redirectTo;
  };

  return (
    <>
      <button onClick={openCart} disabled={loading} aria-disabled={loading} aria-label="Open cart">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
          <ShoppingCartIcon className={clsx("h-6 transition-all ease-in-out hover:scale-110 ")} />
          <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
            {cart.length}
          </div>
        </div>
      </button>

      <Transition
        Tag="div"
        open={isCartOpen}
        onClick={() => closeCart(false)}
        base="fixed z-[1] inset-0 bg-black/30 transition-all ease-in-out duration-200"
        enter="opacity-100 backdrop-blur-[.5px]"
        exit="opacity-0 backdrop-blur-none"
        time="200"
        aria-hidden="true"></Transition>

      {/* Todo: prevent window scrolling when the child is fixed */}
      <Transition
        // Tag="dialog"
        Tag="div"
        open={isCartOpen}
        base="fixed z-[1] bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px] transition-all ease-in-out duration-200"
        enter="translate-x-0"
        exit="translate-x-full"
        time="200"
        role="dialog"
        aria-hidden="false">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{content.cart[lang]}</p>

          <button aria-label="Close cart" onClick={closeCart}>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
              <XMarkIcon className={clsx("h-6 transition-all ease-in-out hover:scale-110 ")} />
            </div>
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <ShoppingCartIcon className="h-16" />
            <p className="mt-6 text-center text-2xl font-bold">{content.empty[lang]}</p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="flex-grow overflow-auto py-4">
              {cart.map((item, i) => {
                const options = {};
                item.options.forEach((o) => (options[o.name.toLowerCase()] = o.value));
                item.options.map((o) => o.value).join(" / ");

                const merchandiseUrl = createUrl(
                  `/${lang}/product/${item.name.replaceAll(" ", "-")}`,
                  new URLSearchParams(options)
                );

                return (
                  <li
                    key={i}
                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                      <div className="absolute z-[1] -mt-2 ml-[55px]">
                        <DeleteItemButton variantId={item.variantId} />
                      </div>
                      <Link href={merchandiseUrl} onClick={closeCart} className="flex flex-row space-x-4">
                        <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                          <Image
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                            alt={item.name}
                            src={item.imageUrl}
                          />
                        </div>

                        <p className="flex-1 ">
                          <span className="block text-sm max-h-14 leading-tight overflow-hidden text-ellipsis break-all">
                            {item.name}
                          </span>
                          <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                            {item.options.map((o) => o.value).join(" / ")}
                          </span>
                        </p>
                      </Link>
                      <div className="flex h-16 flex-col justify-between">
                        <Price
                          className="flex justify-end space-y-2 text-right text-sm"
                          amount={item.price}
                          currency={currency}
                        />
                        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                          <EditItemQuantityButton variantId={item.variantId} type="minus" />
                          <p className="w-6 text-center">
                            <span className="w-full text-sm">{item.quantity}</span>
                          </p>
                          <EditItemQuantityButton variantId={item.variantId} type="plus" />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div dir="auto" className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                <p>{content.tax[lang]}</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={totalTaxAmount}
                  currency={currency}
                />
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>{content.shipping[lang]}</p>
                {/* <p className="text-right">Calculated at checkout</p> */}
                <p className="text-right">{content.shippingCost[lang]}</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>{content.total[lang]}</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={totalAmount}
                  currency={currency}
                />
              </div>
            </div>
            <a
              href="#"
              onClick={redirectToStripe}
              className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100">
              {content.checkout[lang]}
            </a>
          </div>
        )}
      </Transition>
    </>
  );
}

const content = {
  cart: { en: "Shopping Cart", ar: "سلة التسوق" },
  empty: { en: "Your cart is empty.", ar: "عربة التسوق فارغة." },
  tax: { en: "Taxes", ar: "الضريبة" },
  shipping: { en: "Shipping", ar: "الشحن" },
  shippingCost: { en: "Free", ar: "مجانا" },
  total: { en: "Total", ar: "المجموع" },
  checkout: { en: "Proceed to Checkout", ar: "اتمام الطلب ودفع" },
};
