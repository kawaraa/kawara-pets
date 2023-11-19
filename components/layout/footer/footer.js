import FooterMenu from "../../../components/layout/footer/footer-menu";
import Logo from "../logo";
import { Suspense } from "react";
import menu from "./footer.json";
const { SITE_NAME } = process.env;

export default async function Footer({ lang }) {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton = "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";
  const copyrightName = SITE_NAME || "";

  return (
    <footer className="text-sm mt-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Logo />
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }>
          <FooterMenu menu={menu} lang={lang} />
        </Suspense>
      </div>

      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".") ? "." : ""} {content.rights[lang]}
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>{content.certified[lang]}</p>
        </div>
      </div>
    </footer>
  );
}

const content = {
  rights: { en: "All rights reserved", ar: "كل الحقوق محفوظة" },
  certified: { en: "Crafted by Kawara", ar: "Kawara من صنع" },
};
