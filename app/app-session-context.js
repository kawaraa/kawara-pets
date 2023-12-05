"use client";
import React, { createContext, useState, useEffect } from "react";
import { Cookies } from "../service/utilities";
import Messages from "../components/messages";
import ImagePreview from "../components/layout/image-preview";

export const AppSessionContext = createContext();

export default function AppSessionContextProvider({ children, lang, theme }) {
  const [currency, setCurrency] = useState({ code: "EUR", rate: 1 });
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [themeMode, setThemeMode] = useState(theme);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // The message object shape: {type: "error" | "warning" | "success". text:"", duration: 1}
  const addMessage = (type, text, duration) => setMessages([...messages, { type, text, duration }]);

  const updateThemeMode = (mode) => {
    if (Cookies.get("themeMode") != mode) Cookies.set("themeMode", mode);
    window.localStorage.setItem("themeMode", mode);
    setThemeMode(mode);
    document.documentElement.classList.remove("dark", "light", "auto");

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (mode === "dark" || (mode == "auto" && systemDark)) document.documentElement.classList.add("dark");
    else document.documentElement.classList.add("light");
  };

  const updateCart = async (cart) => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };

  useEffect(() => {
    const aThemeMode = Cookies.get("themeMode") || window.localStorage.getItem("themeMode");
    updateThemeMode(aThemeMode || "auto");
    setCart(JSON.parse(window.localStorage.getItem("cart")) || []);
    const [code = "EUR", rate = 1] = Cookies.get("currency")?.split(":") || [];
    setCurrency({ code, rate });

    // Todo: select the language base on the browser language:
    // console.log(window.navigator.language);

    setLoading(false);
  }, []);

  const state = {
    lang,
    currency,
    // setAppLoading,
    loading,
    addMessage,
    themeMode,
    updateThemeMode,
    cart,
    updateCart,
    isCartOpen,
    setIsCartOpen,
  };

  return (
    <AppSessionContext.Provider value={state}>
      {children}
      <Messages messages={messages} setMessages={setMessages} />
      <ImagePreview />
    </AppSessionContext.Provider>
  );
}
