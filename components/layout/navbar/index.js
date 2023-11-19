import Link from "next/link";
import Logo from "../logo";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import menu from "../../content/menu.json";
import CartModal from "./cart/cart-modal";

// Todo: pass currentRoute to this component
export default async function Navbar({ lang }) {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
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
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">
                  {item[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden overflow-hidden justify-center md:flex md:mx-6 md:w-1/3">
          <Search lang={lang} />
        </div>
        {/* Todo: Support the multi language and currency
        <div>EN / AR</div>
        <div>USD / EUR</div> 
        */}
        <div className="flex justify-end md:flex-1">
          <CartModal lang={lang} />
        </div>
      </div>
    </nav>
  );
}
