import { Suspense } from "react";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import getMetadata from "./metadata";
import AppSessionContextProvider from "./app-session-context";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer/footer";
import "./globals.css";

const kufiFont = localFont({
  src: "../public/font/NotoKufiArabic-VariableFont_wght.ttf",
  display: "swap",
});

export default function RootLayout({ children }) {
  // Note: Using "cookies()" triggers the dynamic layout rendering, then access "childProp?.segment"
  const cookieStorage = cookies();
  const [code = "EUR", rate = 1] = cookieStorage.get("currency")?.value?.split(":") || [];
  const lang =
    (children?.props?.childProp?.segment || []).includes("ar") || cookieStorage.get("lang")?.value == "ar"
      ? "ar"
      : "en";
  // const themeMode = cookieStorage.get("themeMode")?.value || "auto";

  return (
    <html dir="auto" translate="no" lang={lang} className={lang == "ar" ? kufiFont.className : ""}>
      <body className="bg-neutral-50 text-slate-700 selection:bg-teal-300 dark:bg-black dark:text-gray-300 dark:selection:bg-pink-500 dark:selection:text-white">
        <AppSessionContextProvider lang={lang} currency={{ code, rate }}>
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

export const metadata = getMetadata({ lang: "en" });

export const viewport = {
  themeColor: "#fafafa",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};
