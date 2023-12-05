import { cookies } from "next/headers";
import { Suspense } from "react";
import Carousel from "../components/layout/carousel";
import { ThreeItemGrid } from "../components/grid/three-items";

export default async function HomePage({ params }) {
  const cookieStorage = cookies();
  const lang = params.lang || cookieStorage.get("lang")?.value || "en";
  const [code = "EUR", rate = 1] = cookieStorage.get("currency")?.value?.split(":") || [];
  const props = { lang, currency: { code, rate } };
  // cookies().set("lang", "en"); // You can set the cookie only on action

  return (
    <>
      <ThreeItemGrid {...props} />
      <Suspense>
        <Carousel {...props} />
      </Suspense>
    </>
  );
}

export const metadata = {
  openGraph: { type: "website" },
};
