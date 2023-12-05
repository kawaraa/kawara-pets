"use client";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { request } from "../../../service/request";
import { BellIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { AppSessionContext } from "../../app-session-context";
import { btnCls } from "../../../components/layout/tailwindcss-class";
import euCountries from "../../../components/content/eu-countries.json";
import Modal from "../../../components/layout/modal";
import { InputField } from "../../../components/layout/inputs";
import { done } from "../../../components/content/shared-content";

export function AddToCart({ lang, product }) {
  const { cart, updateCart, setIsCartOpen, addMessage } = useContext(AppSessionContext);
  const searchParams = useSearchParams();
  const [shippable, setShippable] = useState(true);
  const [region, setRegion] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const variant = product.variants.find((variant) =>
    variant.options.every((option) => option.value === searchParams.get(option.name.toLowerCase()))
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!variant?.quantity || variant?.quantity < 1) return;
    const item = {
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      imageUrl: variant.imageUrl || product.meta.media[0],
      options: variant.options,
      price: variant.price,
      quantity: 1,
      maxQuantity: product.meta.maxQuantity,
    };
    if (!cart.find((it) => it.variantId == item.variantId)) updateCart([...cart, item]);
    setIsCartOpen(true);
  };

  const handlePreOrder = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const data = { productUrl: window.location.href, customerEmail: e.target.email.value, message: "" };
      await request("/api/contact", "POST", data);
      setModalLoading(false);
      setModalOpen(false);
      addMessage("success", done[lang], 3);
    } catch (error) {
      setModalLoading(false);
      addMessage("error", error.message, 5);
    }
  };

  const getUserGeo = async (shippable = false) => {
    const url = `/api/geo?timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    const { country, name, city } = await request(url);

    const countryCodes = Object.keys(product.meta.shippableTo || {});
    if (countryCodes.includes(country)) shippable = true;
    else if (countryCodes.includes("EU") && typeof euCountries[country] == "string") shippable = true;
    setRegion(name && city ? `${name}, ${city}` : content.shippable[lang][1]);
    if (!shippable) setShippable(shippable);
  };

  useEffect(() => {
    getUserGeo();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {!shippable ? (
          <p dir="auto" className="mb-3 mt-5 text-red-400">
            {content.notShippable[lang][0]} <strong className="capitalize">{region}</strong>
          </p>
        ) : (
          <p dir="auto" className="mb-2 mt-5 text-green-600">
            {content.shippable[lang][0]} <strong className="capitalize">{region}</strong>
          </p>
        )}
        <SubmitButton
          lang={lang}
          availableForSale={variant?.quantity > 0}
          selectedVariantId={variant?.id}
          onNotifyMe={setModalOpen}
        />
      </form>

      <Modal
        tag="form"
        title={content.modal.title[lang]}
        open={modalOpen}
        onSubmit={handlePreOrder}
        onCancel={() => setModalOpen(false)}
        okBtn={content.modal.ok[lang]}
        loading={modalLoading}>
        <InputField type="email" name="email" required min="10" max="50" full cls="m-5" />
      </Modal>
    </>
  );
}

function SubmitButton({ lang, availableForSale, selectedVariantId, onNotifyMe }) {
  if (!selectedVariantId) {
    return (
      <button
        type="submit"
        aria-label="Please select an option"
        disabled
        aria-disabled
        className={clsx(btnCls, "w-full")}>
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-6" />
        </div>
        {content.add[lang]}
      </button>
    );
  }

  if (!availableForSale) {
    return (
      <div className="flex">
        <button type="submit" disabled aria-disabled className={clsx(btnCls, "w-full")}>
          {content.stockedOut[lang]}
        </button>
        <div className="w-2"></div>
        <button
          type="button"
          onClick={(e) => e.preventDefault() + onNotifyMe(true)}
          className={clsx(btnCls, " bg-yellow-500")}>
          <BellIcon className="h-6" />
        </button>
      </div>
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
  preOrder: { en: "Notify me when it's in stock", ar: "أعلمني عندما يكون في المخزون" },
  shippable: {
    en: ["Free shipping to", "your country"],
    ar: ["شحن مجانا إلى", "بلدك"],
  },
  notShippable: {
    en: ["This product can not be shipped to", "your country"],
    ar: ["لا يمكن شحن هذا المنتج إلى", "بلدك"],
  },
  modal: {
    title: {
      en: "Please provide us your Email so we let you know when it's in stock.",
      ar: "يرجى تزويدنا بالبريد الإلكتروني الخاص بك حتى نعلمك عندما يكون متوفرًا في المخزون.",
    },
    ok: { en: "Notify me", ar: "بلغني" },
  },
};
