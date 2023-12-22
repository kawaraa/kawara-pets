"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "../../../service/utilities";

export default function Search({ lang }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e) {
    e.preventDefault();
    const val = e.target;
    const search = val.search;
    const newParams = new URLSearchParams(searchParams.toString());
    if (search.value) newParams.set("q", search.value);
    else newParams.delete("q");
    router.push(createUrl(`/${lang}/search`, newParams));
  }

  return (
    <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        key={searchParams?.get("q")}
        type="text"
        name="search"
        placeholder={content.placeholder[lang]}
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <button type="submit" className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </button>
    </form>
  );
}

const content = { placeholder: { en: "Search for products...", ar: "البحث عن المنتجات..." } };
