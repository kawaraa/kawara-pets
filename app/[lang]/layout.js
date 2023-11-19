import { notFound } from "next/navigation";
import getMetadata from "../metadata";

export default function Layout({ children, params }) {
  if (params.lang != "en" && params.lang != "ar") notFound();

  return children;
}

export function generateMetadata({ params }) {
  const data = { alternates: { canonical: params.lang == "en" ? "/" : "/ar" } };
  return getMetadata({ lang: params.lang, data });
}
