// import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import getMetadata from "../metadata";

export default function Layout({ children, params: { lang } }) {
  if (lang != "en" && lang != "ar") return notFound();
  // const token = cookies().get("token")?.value; ; // This only to trigger dynamic layout rendering
  return children;
}

export function generateMetadata({ params: { lang } }) {
  return getMetadata({ lang: lang == "ar" ? lang : "en" });
}
