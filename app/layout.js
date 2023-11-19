import { Suspense } from "react";
import localFont from "next/font/local";
import AppSessionContextProvider from "./app-session-context";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer/footer";
import getMetadata from "./metadata";
import "./globals.css";

const kufiFont = localFont({ src: "../public/font/NotoKufiArabic-VariableFont_wght.ttf", display: "swap" });

// revalidate all the underneath routes and layouts
// export const revalidate = 1800; // 30 mins in seconds

export default async function RootLayout({ children }) {
  const lang = (children?.props?.childProp?.segment || []).includes("ar") ? "ar" : "en";

  return (
    <html translate="no" lang={lang} className={lang == "ar" ? kufiFont.className : ""}>
      {/*
        in the head tag: could be
        const themeColor = themeMode == "dark" ? "#000000" : "#ffffff";
      */}
      <body
        dir="auto"
        className="bg-neutral-50 text-slate-700 selection:bg-teal-300 dark:bg-black dark:text-gray-300 dark:selection:bg-pink-500 dark:selection:text-white"
      >
        {/* background is "dark:bg-black" and the card background is "dark:bg-neutral-900" and can switched */}

        <AppSessionContextProvider lang={lang}>
          {/* Todo: pass the currentRoute to the navbar to disable the active link: currentRoute={route} */}
          <Navbar lang={lang} />
          <Suspense>
            <main className="min-h-[70vh]">{children}</main>
            <Footer lang={lang} />
          </Suspense>
        </AppSessionContextProvider>
      </body>
    </html>
  );
}

export function generateMetadata() {
  return getMetadata({ lang: "en" });
}

export const viewport = {
  themeColor: "#000000",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "#000000",
};
