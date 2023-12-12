import Link from "next/link";
import Logo from "../logo";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import menu from "../../content/menu.json";
import CartModal from "./cart/cart-modal";
import CurrencySelector from "./currency-selector";

export default async function Navbar({ lang }) {
  return (
    <nav
      dir="ltr"
      className="fixed top-0 left-0 right-0 z-[1] bg-white/80 dark:bg-black/80 flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu lang={lang} menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex flex-1">
          <Logo />
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menu.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.path.replace("lang", lang)}
                  className="whitespace-nowrap underline-offset-4 hover:underline ">
                  {item[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden overflow-hidden justify-center md:flex md:mx-6 md:w-1/3">
          <Search lang={lang} />
        </div>

        <CurrencySelector lang={lang} />

        <div className="flex justify-end md:flex-1 ml-2">
          <CartModal lang={lang} />
        </div>
      </div>
    </nav>
  );
}
