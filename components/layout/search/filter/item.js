"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createUrl } from "../../../../service/utilities";

export function FilterItem(props) {
  return "path" in props.item ? <PathFilterItem {...props} /> : <SortFilterItem {...props} />;
}

function PathFilterItem({ lang, item }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path.replace("lang", lang);
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? "p" : Link;

  newParams.delete("q");

  return (
    <li className="mt-2 flex text-black dark:text-white">
      <DynamicTag
        href={createUrl(item.path.replace("lang", lang), newParams)}
        className={clsx("w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100", {
          "underline underline-offset-4": active,
        })}>
        {item.title[lang]}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ lang, item }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;
  const q = searchParams.get("q");
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    })
  );
  const DynamicTag = active ? "p" : Link;

  return (
    <li className="mt-2 flex text-sm text-black dark:text-white">
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx("w-full hover:underline hover:underline-offset-4", {
          "underline underline-offset-4": active,
        })}>
        {item.title[lang]}
      </DynamicTag>
    </li>
  );
}
