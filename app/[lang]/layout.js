import { Suspense } from "react";
import localFont from "next/font/local";
import AppSessionContextProvider from "../app-session-context";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer/footer";
import getMetadata from "../metadata";

const kufiFont = localFont({
  src: "../../public/font/NotoKufiArabic-VariableFont_wght.ttf",
  display: "swap",
});

export default async function Layout({ children, params: { lang } }) {
  if (lang != "en" && lang != "ar") notFound();

  return (
    <html dir="auto" translate="no" lang={lang} className={lang == "ar" ? kufiFont.className : ""}>
      <body className="bg-neutral-50 text-slate-700 selection:bg-teal-300 dark:bg-black dark:text-gray-300 dark:selection:bg-pink-500 dark:selection:text-white">
        <AppSessionContextProvider lang={lang}>
          <Navbar lang={lang} />
          <Suspense>
            <main className="relative min-h-[70vh] pt-24">{children}</main>
            <Footer lang={lang} />
          </Suspense>
        </AppSessionContextProvider>
      </body>
    </html>
  );
}

export function generateMetadata({ params: { lang } }) {
  return getMetadata({ lang });
}
