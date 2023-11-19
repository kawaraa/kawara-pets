import OpengraphImage from "../../../../components/z-opengraph-image";

export default async function Image({ params }) {
  const collection = await getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
