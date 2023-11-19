"use client";
import { useContext, useEffect } from "react";
import clsx from "clsx";
import { AppSessionContext } from "../../app-session-context";
import { Button } from "../../../components/layout/button";
import { btnCls } from "../../../components/layout/tailwindcss-class";

export default function EmptyCartAndPrintReceipt({ lang, html }) {
  const { updateCart } = useContext(AppSessionContext);
  const handlePrint = () => {
    document.body.innerHTML = html;
    setTimeout(() => {
      window.print();
      location.reload();
    }, 500);
  };

  useEffect(() => {
    updateCart([]);
  }, []);

  return (
    <Button icon="download" onClick={handlePrint} cls={clsx(btnCls, "mt-10")}>
      {content.btn[lang]}
    </Button>
  );
}

const content = { btn: { en: "Print and save the receipt", ar: "طباعة وحفظ الإيصال" } };
