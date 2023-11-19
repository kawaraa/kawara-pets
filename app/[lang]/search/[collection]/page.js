import SearchPage from "../page";
import { content as shdCnt } from "../layout";

export default async function CategoryPage(props) {
  return <SearchPage {...props} />;
}

export function generateMetadata({ params: { lang, collection } }) {
  const title = shdCnt.collections.list.find((c) => c.path.includes(collection))?.title[lang];
  return {
    title: `${title || collection} - ${content.title[lang]}`,
    description: `${title || collection} ${content.desc[lang]}`,
  };
}

const content = {
  title: { en: "collection", ar: "فئة - تشكيلة" },
  desc: { en: "products", ar: "منتجات" },
};
