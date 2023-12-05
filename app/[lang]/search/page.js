import { cookies } from "next/headers";
import Grid from "../../../components/grid";
import ProductGridItems from "../../../components/layout/product-grid-items";
import { getProducts } from "../../../service/api-provider";

export default async function SearchPage({ params: { lang, collection }, searchParams }) {
  const [code = "EUR", rate = 1] = cookies().get("currency")?.value?.split(":") || [];
  const props = { lang, currency: { code, rate } };
  const { page, pageSize, sort, q } = searchParams;
  const searchValue = (q || "").trim();
  const category = (collection || "").trim();
  const sorting = sort || "";

  const orderby = content.orderby[Object.keys(content.orderby).find((k) => sorting.includes(k))];
  const direction = sorting.includes("asc") ? "asc" : "desc";
  const products = await getProducts(searchValue, category, page, pageSize, orderby, direction);
  const resultText = content.resultText[lang];

  return (
    <>
      {searchValue || category ? (
        <p className="mb-4">
          {products.length === 0
            ? content.noItems[lang]
            : `${resultText[0]} ${products.length} ${products.length > 1 ? resultText[1] : resultText[2]} ${
                resultText[3]
              } `}
          <span className="font-bold">&quot;{searchValue || category}&quot;</span>
        </p>
      ) : null}

      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems {...props} products={products} />
        </Grid>
      ) : null}
    </>
  );
}

export const metadata = { title: "Search", description: "Search for products in the store." };

const content = {
  noItems: { en: "There are no products that match", ar: "لا توجد منتجات مطابقة للبحث" },
  resultText: { en: ["Showing", "results", "result", "for"], ar: ["عرض", "النتائج", "نتيجة", "ل"] },
  orderby: { trending: "", latest: "createdAt", price: "" },
};
