import Link from "next/link";
import Grid from "../../components/grid";
import { GridTileImage } from "../../components/grid/tile";

export default function ProductGridItems({ lang, products }) {
  return (
    <>
      {products.map((product, i) => (
        <Grid.Item key={i} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/${lang}/product/${product.name.replaceAll(" ", "-")}`}>
            <GridTileImage
              alt={product.name}
              label={{ title: product.name, amount: product.variants[0].price, currencyCode: "EUR" }}
              src={product.meta.images[0]}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
