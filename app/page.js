import { cookies } from "next/headers";
import { Suspense } from "react";
import { Carousel } from "../components/layout/carousel";
import { ThreeItemGrid } from "../components/grid/three-items";

export default async function HomePage({ params }) {
  const lang = params.lang || cookies().get("lang")?.value || "en";
  // Use this in the server component: import { cookies } from "next/headers";
  // cookies().set("lang", "en");
  // console.log(cookies().get("lang")?.value);
  return (
    <>
      <ThreeItemGrid lang={lang} />
      <Suspense>
        <Carousel lang={lang} />
      </Suspense>
    </>
  );
}

export const metadata = {
  openGraph: { type: "website" },
};
