// import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getSupportedLanguage } from "../layout";
import getMetadata from "../metadata";

export default function Layout({ children, params: { lang } }) {
  if (!getSupportedLanguage(lang)) return notFound();
  // const token = cookies().get("token")?.value; ; // This only to trigger dynamic layout rendering
  return children;
}

export function generateMetadata({ params }) {
  const lang = getSupportedLanguage(params.lang) || "en";
  return getMetadata({ lang, title: content.title[lang] });
}

const content = {
  title: { en: "Kawara Pets", ar: "كوارا للحيوانات الأليفة" },
};
