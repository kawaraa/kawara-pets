import getMetadata from "./metadata";
import "./globals.css";

export default function RootLayout({ children }) {
  return children;
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
