import Link from "next/link";
import { GridMediaTile } from "../grid/tile";
import { getCollection } from "../../service/api-provider";

export default async function Carousel({ lang, currency }) {
  // Home page Carousel Collections are the products that have `carousel-items` vendor.
  const products = await getCollection("storefront-items");

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  // Todo: make the carousel infinite
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={i}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3">
            <Link
              href={`/${lang}/product/${product.name.replaceAll(" ", "-")}`}
              className="relative h-full w-full">
              <GridMediaTile
                lang={lang}
                controls={true}
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.variants[0].price,
                  currency,
                }}
                src={product.meta.media[0]}
                // fill
                // sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                width="1000"
                height="1000"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
