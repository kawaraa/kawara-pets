"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GridMediaTile } from "../../../components/grid/tile";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createUrl } from "../../../service/utilities";

export function Gallery({ lang, media }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mediaSearchParam = searchParams.get("media");
  const mediaIndex = mediaSearchParam ? parseInt(mediaSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextMediaIndex = mediaIndex + 1 < media.length ? mediaIndex + 1 : 0;
  nextSearchParams.set("media", nextMediaIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousMediaIndex = mediaIndex === 0 ? media.length - 1 : mediaIndex - 1;
  previousSearchParams.set("media", previousMediaIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  const currentMedia = media[mediaIndex];

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {currentMedia?.src && currentMedia.src.match(/video|mp4/gim) ? (
          <video controls title={currentMedia.alt} poster={media[0].src} className="w-full h-auto">
            <source src={currentMedia.src} type="video/mp4" />
            {currentMedia.alt}
          </video>
        ) : (
          <Image
            src={currentMedia.src}
            alt={currentMedia.alt}
            sizes="(min-width: 1024px) 66vw, 100vw"
            fill
            priority={true}
            className="h-full w-full object-contain"
          />
        )}
      </div>

      {media.length > 1 ? (
        <div className="flex w-full justify-center">
          <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
            <Link
              aria-label="Previous product image"
              href={previousUrl}
              className={buttonClassName}
              scroll={false}
            >
              <ArrowLeftIcon className="h-5" />
            </Link>
            <div className="mx-1 h-6 w-px bg-neutral-500"></div>
            <Link aria-label="Next product image" href={nextUrl} className={buttonClassName} scroll={false}>
              <ArrowRightIcon className="h-5" />
            </Link>
          </div>
        </div>
      ) : null}

      {media.length > 1 ? (
        <ul className="my-2 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {media.map((m, index) => {
            const isActive = index === mediaIndex;
            const mediaSearchParams = new URLSearchParams(searchParams.toString());

            mediaSearchParams.set("media", index.toString());

            return (
              <li key={m.src} className="h-20 w-20">
                <Link
                  aria-label="Enlarge product image"
                  href={createUrl(pathname, mediaSearchParams)}
                  scroll={false}
                  className="h-full w-full"
                >
                  <GridMediaTile
                    lang={lang}
                    alt={m.alt}
                    src={m.src}
                    poster={media[0].src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
