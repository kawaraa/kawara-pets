"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Transition from "../transition";
import Search from "./search";

export default function MobileMenu({ menu, lang }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMobileMenu = () => setIsMenuOpen(true);
  const closeMobileMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white md:hidden">
        <Bars3Icon className="h-4" />
      </button>

      <Transition
        Tag="div"
        open={isMenuOpen}
        onClick={() => closeMobileMenu(false)}
        base="fixed z-[1] inset-0 bg-black/30 transition-all ease-in-out duration-200"
        enter="opacity-100 backdrop-blur-[.5px]"
        exit="opacity-0 backdrop-blur-none"
        time="200"
        aria-hidden="true"></Transition>

      <Transition
        Tag="div"
        open={isMenuOpen}
        base="fixed z-[1] bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black p-4 transition-all ease-in-out duration-300"
        enter="translate-x-0"
        exit="translate-x-[-100%]"
        time="200">
        <button
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
          onClick={closeMobileMenu}
          aria-label="Close mobile menu">
          <XMarkIcon className="h-6" />
        </button>
        <div className="mb-4 w-full">
          <Search />
        </div>
        <ul className="flex w-full flex-col">
          {menu.map((item, i) => (
            <li
              className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
              key={i}>
              <Link href={item.path.replace("lang", lang)} onClick={closeMobileMenu}>
                {item[lang]}
              </Link>
            </li>
          ))}
        </ul>
      </Transition>
    </>
  );
}
