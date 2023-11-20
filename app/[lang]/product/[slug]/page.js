import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { getProductBySlug, getRecommendedProducts } from "../../../../service/api-provider";
import { GridTileImage } from "../../../../components/grid/tile";
import { Gallery } from "../gallery";
import { ProductSpecifications } from "../product-specifications";
import Prose from "../../../../components/prose";
import { desc } from "../../../../components/content/shared-content";

export default async function ProductPage({ params: { lang, slug }, searchParams }) {
  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const variants = product.variants.sort((a, b) => a.price - b.price);
  const availableForSale = product.variants.reduce((acc, v) => acc + v.quantity, 0);
  product.lowPrice = variants[0].price;
  product.highPrice = variants[variants.length - 1].price;
  product.comparePrice = variants[variants.length - 1].comparePrice;

  const specifications = {};
  const [description, otherText] = (product.description || "").trim().split("---");
  otherText?.split("\n").map((line) => {
    const [key, value] = line.split(":");
    const k = key?.trim();
    if (k) specifications[k] = value?.trim();
  });

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.meta.images[0],
    offers: {
      "@type": "AggregateOffer",
      availability: availableForSale > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      priceCurrency: "EUR",
      highPrice: product.highPrice,
      lowPrice: product.lowPrice,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="h-full w-full basis-full lg:basis-4/6">
              <Gallery images={product.meta.images.map((image) => ({ src: image, altText: product.name }))} />
            </div>

            <div className="basis-full lg:basis-2/6">
              <ProductSpecifications lang={lang} product={product} selectedOptions={searchParams} />
            </div>
          </div>

          {description && (
            <div dir="auto" className="mt-20">
              <h2 className="text-xl font-semibold mb-4">{desc[lang]}</h2>
              <Prose className="overflow-hidden whitespace-pre-line" html={description} />
            </div>
          )}

          {specifications && (
            <div dir="auto" className="mt-10">
              <h3 className="font-semibold mb-2">{content.specificationTitle[lang]}</h3>

              <table
                dir="auto"
                className="text-sm leading-tight table-auto border-collapse border border-slate-400"
              >
                <tbody>
                  {Object.keys(specifications).map((k, i) => (
                    <tr key={i}>
                      <th scope="row" className="border border-slate-300 p-2 text-left">
                        {k}
                      </th>
                      <td className="border border-slate-300 p-2">{specifications[k]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Suspense>
          <RelatedProducts lang={lang} slug={slug} />
        </Suspense>
      </div>
    </>
  );
}

export async function generateMetadata({ params: { lang, slug } }) {
  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  return {
    title: product.name,
    description: product.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: product.meta.images[0]
      ? {
          images: [
            {
              url: product.meta.images[0],
              width: 300,
              height: 300,
              alt: product.name,
            },
          ],
        }
      : null,
  };
}

async function RelatedProducts({ lang, slug }) {
  const relatedProducts = await getRecommendedProducts(slug);
  if (!relatedProducts.length) return null;

  relatedProducts.map((p) => {
    p.variants = p.variants.sort((a, b) => a.price - b.price);
    p.lowPrice = p.variants[0].price;
    p.highPrice = p.variants[p.variants.length - 1].price;
  });

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">{content.relatedProducts[lang]}</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product, i) => (
          <li key={i} className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
            <Link className="relative h-full w-full" href={`/${lang}/product/${slug}`}>
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.lowPrice,
                  currencyCode: "EUR",
                }}
                src={product.meta.images[0]}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const content = {
  specificationTitle: { en: "Specifications", ar: "المواصفات" },
  relatedProducts: { en: "Related Products", ar: "منتجات ذات صله" },
};
