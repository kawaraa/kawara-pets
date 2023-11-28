import Link from "next/link";
import { getCollection } from "../../service/api-provider";
import { GridMediaTile } from "../../components/grid/tile";

export async function ThreeItemGrid({ lang }) {
  // Home page Collections are the products that have `storefront-items` vendor.
  const products = await getCollection("storefront-items");

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      {products.map((p, i) => (
        <ThreeItemGridItem lang={lang} item={p} size={i == 0 && "full"} priority={i < 3} key={i} />
      ))}
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
        <GridMediaTile
          lang={lang}
          controls={true}
          src={item.meta.media[0]}
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
