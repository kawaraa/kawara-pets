"use client";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "../../../service/utilities";
import { optionNames } from "../../../components/content/shared-content";

export function VariantSelector({ lang, variants }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const options = {};

  for (const variant of variants) {
    variant.options.forEach((opt) => {
      if (options[opt.name]) options[opt.name].add(opt.value);
      else options[opt.name] = new Set([opt.value]);
    });
  }
  Object.keys(options).forEach((name) => (options[name] = Array.from(options[name])));

  return Object.keys(options).map((name, i) => (
    <dl dir="auto" className="mb-4" key={name}>
      <dt className="mb-2 text-sm uppercase tracking-wide">{optionNames[name][lang] || name}</dt>
      <dd className="flex flex-wrap gap-3">
        {options[name].map((value) => {
          const optionNameLowerCase = name.toLowerCase();

          // Base option params on current params so we can preserve any other param state in the url.
          const optionSearchParams = new URLSearchParams(searchParams.toString());

          // Update the option params using the current option to reflect how the url *would* change,
          // if the option was clicked.
          optionSearchParams.set(optionNameLowerCase, value);
          const optionUrl = createUrl(pathname, optionSearchParams);

          // In order to determine if an option is available for sale, we need to:
          // This is the "magic" that will cross check possible variant combinations and preemptively
          // disable combinations that are not available. For example, if the color gray is only available in size medium,
          // then all other sizes should be disabled.

          const entities = Array.from(optionSearchParams.entries());

          // 1. Find the selected variant that is in param state
          const selectedVariant = variants.find(
            (v) => v.options.filter((o) => entities.find(([k, v]) => v == o.value)).length == entities.length
          );

          // 2. Check if there are variants available in the selected options or it's in stock.
          const isAvailableForSale = selectedVariant;
          const isDisabled = i > 0 && !isAvailableForSale;

          // The option is active if it's in the url params.
          const isActive = searchParams.get(optionNameLowerCase) === value;
          return (
            <button
              key={value}
              aria-disabled={isDisabled}
              disabled={isDisabled}
              onClick={() => {
                if (i > 0) router.replace(optionUrl, { scroll: false });
                else {
                  const newSearchParams = new URLSearchParams();
                  newSearchParams.set(optionNameLowerCase, value);
                  router.replace(createUrl(pathname, newSearchParams), { scroll: false });
                }
              }}
              title={`${name} ${value}${isDisabled ? " (Out of Stock)" : ""}`}
              className={clsx(
                "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                {
                  "cursor-default ring-2 ring-blue-600": isActive,
                  "ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ":
                    !isActive && isAvailableForSale,
                  "relative z-1 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-1 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700":
                    isDisabled,
                }
              )}>
              {value}
            </button>
          );
        })}
      </dd>
    </dl>
  ));
}
