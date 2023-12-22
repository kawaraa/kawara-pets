import { cookies } from "next/headers";
import { Suspense } from "react";
import Carousel from "../../components/layout/carousel";
import { ThreeItemGrid } from "../../components/grid/three-items";

export default async function HomePageByLang({ params: { lang } }) {
  if (lang != "en" && lang != "ar") return null;

  const [code = "EUR", rate = 1] = cookies().get("currency")?.value?.split(":") || [];
  const props = { lang, currency: { code, rate } };

  return (
    <>
      <ThreeItemGrid {...props} />
      <Suspense>
        <Carousel {...props} />
      </Suspense>
    </>
  );
}

export function generateMetadata({ params: { lang } }) {
  return lang != "en" ? null : { alternates: { canonical: "/" } };
}
