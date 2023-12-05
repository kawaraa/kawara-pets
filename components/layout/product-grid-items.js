import Link from "next/link";
import Grid from "../../components/grid";
import { GridMediaTile } from "../../components/grid/tile";

export default function ProductGridItems({ lang, currency, products }) {
  return (
    <>
      {products.map((product, i) => (
        <Grid.Item key={i} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/${lang}/product/${product.name.replaceAll(" ", "-")}`}>
            <GridMediaTile
              lang={lang}
              controls={true}
              alt={product.name}
              label={{ title: product.name, amount: product.variants[0].price, currency: currency }}
              src={product.meta.media[0]}
              // fill
              // sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              width="1000"
              height="1000"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
