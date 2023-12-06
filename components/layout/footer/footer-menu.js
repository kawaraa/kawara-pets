"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function FooterMenu({ menu, lang }) {
  return (
    <nav>
      <ul>
        {menu.map((item, i) => (
          <FooterMenuItem key={i} item={item} lang={lang} />
        ))}
      </ul>
    </nav>
  );
}

const FooterMenuItem = ({ item, lang }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path.replace("lang", lang)}
        className={clsx(
          "block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm",
          {
            "text-black dark:text-neutral-300": active,
          }
        )}>
        {item[lang]}
      </Link>
    </li>
  );
};
