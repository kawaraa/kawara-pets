"use client";
import { useContext } from "react";
import { AppSessionContext } from "../../../app/app-session-context";
import { request } from "../../../service/request";
import { Cookies, validateError } from "../../../service/utilities";
import currencies from "../../content/currencies.json";
import { bCls, bHrFsCls, cardBgCls } from "../tailwindcss-class";

export default function CurrencySelector({ lang }) {
  const { currency, addMessage } = useContext(AppSessionContext);

  const handleCurrencyChange = async (e) => {
    const [code] = e.target.value.split("-");
    try {
      const exchangeInfo = await request("/api/exchange-rate");
      Cookies.set("currency", `${code}:${exchangeInfo[code]}`, 3);
      window.location.reload();
    } catch (error) {
      addMessage("error", validateError(error.message, lang), 5);
    }
  };

  return (
    <label htmlFor="country" className="flex min-w-[70px] text-sm">
      <select
        value={currency.code}
        onChange={handleCurrencyChange}
        id="country"
        className={`${cardBgCls} ${bCls} ${bHrFsCls} rounded-lg w-full text-center py-2 dark:text-white`}>
        {Object.keys(currencies).map((k, i) => (
          <option value={k} key={i}>
            {currencies[k]} {k}
          </option>
        ))}
      </select>
    </label>
  );
}
