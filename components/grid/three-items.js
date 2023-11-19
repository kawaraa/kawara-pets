import Link from "next/link";
import { getCollection } from "../../service/api-provider";
import { GridTileImage } from "../../components/grid/tile";

export async function ThreeItemGrid({ lang }) {
  // Home page Collections are the products that have `storefront-items` vendor.
  const products = await getCollection("storefront-items");

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem lang={lang} item={products[0]} size="full" priority={true} />
      <ThreeItemGridItem lang={lang} item={products[0]} size="half" priority={true} />
      <ThreeItemGridItem lang={lang} item={products[0]} size="half" />
    </section>
  );
}

function ThreeItemGridItem({ lang, item, size, priority }) {
  if (!item?.variants) return null;

  const variants = item.variants.sort((a, b) => a.price - b.price);
  return (
    <div className={size === "full" ? "md:col-span-4 md:row-span-2" : "md:col-span-2 md:row-span-1"}>
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/${lang}/product/${item.name.replaceAll(" ", "-")}`}
      >
        <GridTileImage
          src={item.meta.images[0]}
          fill
          sizes={size === "full" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          priority={priority}
          alt={item.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.name,
            amount: variants[0].price,
            currencyCode: "EUR",
          }}
        />
      </Link>
    </div>
  );
}
