"use client";
import { useContext, useEffect, useState } from "react";
import { request } from "../../../service/request";
import { AppSessionContext } from "../../app-session-context";
import { InputField, Select, Textarea } from "../../../components/layout/inputs";
import { Button } from "../../../components/layout/button";
import { bCls } from "../../../components/layout/tailwindcss-class";
import { send, done } from "../../../components/content/shared-content";
const siteName = process.env.SITE_NAME || "";

export default function Contact({ params: { lang } }) {
  const { addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = {};
      new FormData(e.target).forEach((value, key) => (data[key] = value));
      await request("/api/contact", "POST", data);
      e.target.reset();
      setLoading(false);
      addMessage("success", done[lang], 3);
    } catch (error) {
      setLoading(false);
      addMessage("error", error.message, 5);
    }
  };

  useEffect(() => {
    document.title = `${content.h1[lang]} - ${siteName}`;
  }, []);

  return (
    <form dir="auto" onSubmit={handleSend} className={`max-w-xl ${bCls} rounded-lg mx-auto my-20 p-5`}>
      <h1 className="text-2xl text-center font-bold mb-10">{content.h1[lang]}</h1>

      <InputField
        type="text"
        name="name"
        required
        min="4"
        max="15"
        autoComplete="given-name"
        full
        label={<span className="inline-block min-w-[90px]">{content.labels[0][lang]}</span>}
        placeholder={content.labels[0][lang]}
        title={content.labels[0][lang]}
        cls="1 flex flex-col sm:flex-row sm:items-center"
        inCls={`flex-1 rounded-md`}
      />

      <InputField
        type="email"
        name="email"
        required
        min="10"
        max="50"
        autoComplete="given-name"
        full
        label={<span className="inline-block min-w-[90px]">{content.labels[1][lang]}</span>}
        placeholder={content.labels[1][lang]}
        title={content.labels[1][lang]}
        cls="1 mt-3 flex flex-col sm:flex-row sm:items-center"
        inCls={`flex-1 rounded-md`}
      />

      <Select
        name="subject"
        required
        label={<span className="inline-block min-w-[90px]">{content.labels[2][lang]}</span>}
        cls="mt-8 flex flex-col sm:flex-row sm:items-center"
        inCls="flex-1 rounded-md">
        {content.subjects.map((s, i) => (
          <option value={s.en} key={i}>
            {s[lang]}
          </option>
        ))}
      </Select>

      <Textarea
        required
        name="message"
        label={<span className="inline-block min-w-[90px]">{content.labels[3][lang]}</span>}
        cls="mt-5 flex flex-col sm:flex-row "
      />

      <div className="text-center mt-10">
        <Button type="submit" loading={loading} cls="w-full sm:w-auto">
          {send[lang]}
        </Button>
      </div>
    </form>
  );
}

const content = {
  h1: { en: "Contact us", ar: "تواصل معنا" },
  labels: [
    { en: "Name", ar: "الإ سم" },
    { en: "Email", ar: "بريد إلكتروني" },
    { en: "Subject", ar: "الموضوع" },
    { en: "Message", ar: "الرسالة" },
  ],
  subjects: [
    { en: "Product Inquiry", ar: "الاستفسار عن منتج" },
    { en: "Wholesale Inquiry", ar: "استفسار عن الجملة" },
    { en: "Order Assistance", ar: "المساعدة من أجل الطلب" },
    { en: "Return and Exchange", ar: "إرجاع والتبديل" },
    { en: "Billing and Payment", ar: "الفواتير والدفع" },
    { en: "Security Concern", ar: "مخاوف أمنية" },
    { en: "Privacy Concern", ar: "مخاوف الخصوصية" },
    { en: "Technical Support", ar: "الدعم فني" },
    { en: "Feedback or Suggestion", ar: "ملاحظة أو اقتراح" },
    { en: "General Inquiry", ar: "استفسار عام" },
    { en: "Other", ar: "شيء آخر" },

    // { en: "Account Assistance", ar: "مساعدة من أجل الحساب" },
    // { en: "Shipping and Delivery", ar: "" },
    // { en: "Gift Card", ar: "" },
    // { en: "Marketing and Promotions", ar: "" },
  ],
};
