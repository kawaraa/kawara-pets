import { AddToCart } from "./add-to-cart";
import Price from "../../../components/price";
import { VariantSelector } from "./variant-selector";

export function ProductSpecifications({ lang, product, services, selectedOptions }) {
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

      {services && (
        <div dir="auto" className="mt-10">
          <h3 className="font-semibold mb-2">{content.servicesTitle[lang]}</h3>
          <table
            dir="auto"
            className="w-full text-sm leading-tight table-auto border-collapse border border-slate-400"
          >
            <tbody>
              {Object.keys(services).map((k, i) => (
                <tr key={i}>
                  <th scope="row" className="border border-slate-300 p-2 text-left">
                    {k}
                  </th>
                  <td className="border border-slate-300 p-2">{services[k]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

const content = {
  servicesTitle: { en: "Services", ar: "الخدمات" },
};
