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
        title: { en: "Grooming", ar: "عناية" },
        path: "/lang/search/grooming",
        // Brushes, combs, Dental care products
      },
      {
        title: { en: "Toys", ar: "ألعاب" },
        path: "/lang/search/toy",
        // Interactive, Chew, Plush Balls and fetch toys
      },
      {
        title: { en: "Feeding", ar: "تغذية" },
        path: "/lang/search/feeding",
        // Feeding: Feeder, water dispenser, water bottles, Bowls And Pots
      },
      {
        title: { en: "Furniture", ar: "أثاث وفرش" },
        path: "/lang/search/furniture",
        // Furniture: Cages, Bedding, litter, beds, mattresses, Blankets, throws, Crates, carriers, Cat trees, scratching posts, Aquarium
      },
      {
        title: { en: "Apparel", ar: "ملابس" },
        path: "/lang/search/apparel",
        // Apparel: Clothing, costumes, Hats, caps, Sunglasses
      },
      {
        title: { en: "Accessories", ar: "إكسسوارات" },
        path: "/lang/search/accessories",
        // Accessories: Leashes, Collars, Harnesses, Safety restraints, ID tags, Clickers, whistles, Training pads, Behavior modification tools
      },
      {
        title: { en: "Technology", ar: "إلكترونيات" },
        path: "/lang/search/technology",
        // Technology: Pet trackers and GPS devices, Smart feeding systems, Pet cameras, Electronic pet doors
      },
      // For outdoor tools, just add the "Outdoor - Travel - Outdoor gear - hiking - camping - Portable" words at the beginning of every product title:
      // For example:
      // Outdoor Portable bowls
      // Travel Portable bowls
      // Outdoor gear Portable bowls
      // hiking Portable bowls
      // camping Portable bowls
    ],
  },
};
