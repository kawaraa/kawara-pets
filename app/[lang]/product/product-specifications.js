import { AddToCart } from "./add-to-cart";
import Price from "../../../components/price";
import Prose from "../../../components/prose";
import { VariantSelector } from "./variant-selector";

export function ProductSpecifications({ lang, product, selectedOptions }) {
  const options = Object.keys(selectedOptions).map((k) => selectedOptions[k]);
  const v = product.variants.find((v) => v.options.every((o) => options.includes(o.value)));

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-2xl font-medium">{product.name}</h1>
        <div className="flex">
          {product.comparePrice > 0 && (
            <>
              <Price
                amount={product.comparePrice}
                currencyCode="EUR"
                className="rounded-full bg-blue-400 px-2 py-1 text-sm text-white line-through"
              />
              <span className="w-3 h-3"></span>
            </>
          )}
          <Price
            amount={v?.price || product.lowPrice}
            currencyCode="EUR"
            className="rounded-full bg-blue-600 px-2 py-1 text-sm text-white"
          />
        </div>
      </div>
      <VariantSelector lang={lang} variants={product.variants} />

      <AddToCart lang={lang} product={product} />

      {product.meta?.serviceInfo && (
        <div>
          <h3 className="font-semibold mt-4 mb-2">{content.specificationTitle[lang]}</h3>
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product.meta?.serviceInfo}
          />
          {/* Todo: use table to generate this data "product.meta?.serviceInfo" */}
        </div>
      )}
    </>
  );
}

const content = {
  specificationTitle: { en: "Specifications And Services", ar: "المواصفات والخدمات" },
};
