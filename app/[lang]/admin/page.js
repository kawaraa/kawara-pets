"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../../../components/layout/button";
import { Cookies } from "../../../service/utilities";
import { linkCls } from "../../../components/layout/tailwindcss-class";
import Modal from "../../../components/layout/modal";
import { InputField } from "../../../components/layout/inputs";
const siteName = process.env.SITE_NAME || "";

export default function AddProducts({ params: { lang } }) {
  const [token, setToken] = useState("");

  const setSecretKey = (token = "") => {
    console.log(token);
    if (!token) Cookies.remove("accessToken");
    else Cookies.set("accessToken", token);
    setToken(token);
  };

  useEffect(() => {
    document.title = `${content.h1[lang]} - ${siteName}`;
    const accessToken = Cookies.get("accessToken");
    if (accessToken) setToken(accessToken);
  }, []);

  return (
    <>
      <div className="mt-5 mb-10 px-3 text-right">
        <Button onClick={() => setSecretKey("")} cls="w-full sm:w-auto !py-1 !px-2 !bg-orange-300">
          {content.btn[lang]}
        </Button>
      </div>

      <div className="flex flex-wrap">
        {content.link.map((link, i) => (
          <Link href={link.url.replace("lang", lang)} className={`mx-3 ${linkCls}`} key={i}>
            {link[lang]}
          </Link>
        ))}
      </div>

      <Modal
        tag="form"
        title={content.modal.title[lang]}
        open={!token}
        onSubmit={(e) => e.preventDefault() + setSecretKey(e.target.token.value)}
        okBtn={content.modal.ok[lang]}>
        <InputField type="text" name="token" required min="30" max="300" full cls="m-5" />
      </Modal>
    </>
  );
}

const content = {
  h1: { en: "Admin login", ar: "دخول المشرف" },
  btn: { en: "Clear secret key", ar: "مسح المفتاح السري" },
  modal: {
    title: { en: "Please enter your secret key", ar: "الرجاء إدخال المفتاح السري الخاص بك" },
    ok: { en: "Save", ar: "حفظ" },
  },
  link: [
    { en: "Products", ar: "المنتجات", url: "/lang/admin/products" },
    { en: "Add products", ar: "أضف المنتجات", url: "/lang/admin/products/add" },
    { en: "Fulfill orders", ar: "تلبية الطلبات", url: "/lang/admin/orders" },
  ],
};
