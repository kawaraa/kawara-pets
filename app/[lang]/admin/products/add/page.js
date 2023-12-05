"use client";
import { useContext, useState } from "react";
import { request } from "../../../../../service/request";
import { AppSessionContext } from "../../../../app-session-context";
import { Select, Textarea } from "../../../../../components/layout/inputs";
import { Button } from "../../../../../components/layout/button";
import { send, done } from "../../../../../components/content/shared-content";
import { bCls } from "../../../../../components/layout/tailwindcss-class";
import { copyText } from "../../../../../service/utilities";
const siteName = process.env.SITE_NAME || "";

export default function AddProducts({ params: { lang } }) {
  const { addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSend = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {};
    try {
      new FormData(e.target).forEach((value, key) => (data[key] = value));
      setResponse(JSON.stringify(await request("/api/scrape-product", "POST", data)));
      e.target.reset();
      setLoading(false);
      if (response.includes("success")) addMessage("success", done[lang], 3);
    } catch (error) {
      setLoading(false);
      addMessage("error", error.message, 5);
    }
  };

  return (
    <>
      <form dir="auto" onSubmit={handleSend} className={`max-w-xl ${bCls} rounded-lg mx-auto my-10 p-5`}>
        <h1 className="text-2xl text-center font-bold mb-10">{content.h1[lang]}</h1>
        <Select
          name="retailer"
          required
          label={<span className="inline-block min-w-[90px]">{content.retailer.label[lang]}</span>}
          cls="mt-8 flex flex-col sm:flex-row sm:items-center"
          inCls="flex-1 rounded-md">
          {content.retailer.values.map((v, i) => (
            <option value={v.en} key={i} className="capitalize">
              {v[lang]}
            </option>
          ))}
        </Select>
        <Textarea
          required
          name="link"
          label={<span className="inline-block min-w-[90px]">{content.url[lang]}</span>}
          cls="mt-8 flex flex-col sm:flex-row "
        />

        <div className="text-center mt-10">
          <Button type="submit" loading={loading} cls="w-full sm:w-auto">
            {send[lang]}
          </Button>
        </div>
      </form>
      <div
        onClick={() => copyText(response).then(() => addMessage("success", done[lang], 3))}
        className={`overflow-auto max-w-4xl max-h-screen whitespace-break-spaces test-sx opacity-80 cursor-pointer ${bCls} rounded-lg mx-auto p-3`}>
        {response}
      </div>
    </>
  );
}

const content = {
  h1: { en: "Add products form", ar: "نموذج إضافة المنتجات" },
  retailer: {
    label: { en: "Retailer", ar: "البائع تجزئة" },
    values: [
      { en: "aliexpress", ar: "علي اكسبريس" },
      { en: "cjdropshipping", ar: "سي جي دروبشيبينغ" },
      // { en: "xxx", ar: "xxx" },
    ],
  },
  url: { en: "Product link", ar: "رابط المنتج" },
};
