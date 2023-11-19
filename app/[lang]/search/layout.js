import Footer from "../../../components/layout/footer/footer";
import Collections from "../../../components/layout/search/collections";
// import FilterList from "../../../components/layout/search/filter";
import { Suspense } from "react";

export default function SearchLayout({ children, params }) {
  const lang = params.lang;

  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections lang={lang} content={content.collections} />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
        {/* <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList lang={lang} content={content.sorting} />
        </div> */}
      </div>
      <Footer />
    </Suspense>
  );
}

export const content = {
  sorting: {
    title: { en: "Sort by", ar: "ترتيب حسب" },
    list: [
      {
        title: { en: "Trending", ar: "الشائع" },
        slug: "trending-desc",
      },
      {
        title: { en: "Latest arrivals", ar: "الأحدث" },
        slug: "latest-desc",
      },
      {
        title: { en: "Price: Low to high", ar: "السعر من الارخص" },
        slug: "price-asc",
      },
      {
        title: { en: "Price: High to low", ar: "السعر من الأرخص" },
        slug: "price-desc",
      },
    ],
  },
  collections: {
    title: { en: "Collections", ar: "تشكيلات" },
    list: [
      {
        title: { en: "Toys", ar: "دمية" },
        path: "/lang/search/toy",
      },
    ],
  },
};
