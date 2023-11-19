import OpengraphImage from "../../components/z-opengraph-image";

export default async function Image({ params }) {
  const page = await getPage(params.page);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
