"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SvgIcon from "./svg-icon";
import Loader from "./loader";
import Transition from "./transition";

export function Button({ children, type = "button", icon, loading, disabled, cls, iconCls, ...p }) {
  let c = `inline-flex justify-center items-center px-4 py-2 md:text-lg bg-blue-500 text-white font-medium rounded-md shadow-md disabled:opacity-60 disabled:cursor-no-drop transition-all transition select-none `;
  if (!disabled && !loading) c += "hover:opacity-[0.9] ";
  if (loading) c += "cursor-progress ";
  c += cls || "";

  return (
    <button type={type} disabled={disabled || loading} className={c} {...p}>
      {children}
      {loading ? (
        <Loader size="18" />
      ) : (
        icon && (
          <>
            <span className="inline-block w-1 h-1"></span>
            <span className={iconCls || "w-5"}>
              {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}
            </span>
          </>
        )
      )}
    </button>
  );
}

export function IconButton({ children, icon, cls, ...p }) {
  let c = `overflow-hidden inline-flex items-center justify-center p-[5px] cursor-pointer disabled:hover:text-none disabled:opacity-60 disabled:cursor-no-drop transition select-none `;
  c += cls || "w-8 rounded-full hover:text-red-400";
  const t = p.title || p.name;

  return (
    <button type="button" title={t} aria-label={t} className={c} {...p}>
      {children}
      {(typeof icon === "string" && <SvgIcon name={icon} />) || icon}
    </button>
  );
}

export function LinkButton({ children, icon, cls, iconCls, href, ...p }) {
  const c = `inline-flex justify-center items-center px-4 py-2 md:text-lg bg-pc bg-gradient-to-tl hover:from-bg9 text-t font-medium rounded-md shadow-md transition-all transition select-none `;

  return (
    <Link passHref legacyBehavior href={href}>
      <a className={c + (cls || "")} {...p}>
        {children}
        {icon && (
          <span className={iconCls || "w-5"}>
            {" "}
            {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}
          </span>
        )}
      </a>
    </Link>
  );
}

export function Dropdown({ children, title, event, btnContent, icon, iconCls, cls, btnCls, ...p }) {
  const wrapper = useRef(null);
  const pathName = usePathname();
  const [active, setActive] = useState(false);
  const btnProps = {};

  if (event !== "click") {
    btnProps.onMouseEnter = () => setActive(true);
    btnProps.onMouseLeave = () => setActive(false);
  }

  useEffect(() => {
    setActive(false);
  }, [pathName]);

  useEffect(() => {
    if (event === "click") {
      const clickHandler = (e) => !wrapper.current?.contains(e.target) && setActive(false);
      window.document.addEventListener("click", clickHandler);
      return () => window.document.removeEventListener("click", clickHandler);
    }
  }, [event]);

  const mt = event == "click" ? "mt-[10px]" : "";
  return (
    <div ref={wrapper} {...btnProps} className={`relative inline-block select-none ${cls}`}>
      <button
        type="button"
        onClick={() => setActive(!active)}
        className={`overflow-hidden flex w-full items-center justify-end rounded-md hover:text-lt dark:hover:text-dt ${btnCls}`}
        title={title || "user menu"}
        aria-label={title}
        aria-expanded={active}
        aria-haspopup="menu">
        {btnContent}
        <span className={iconCls}>{typeof icon === "string" ? <SvgIcon name={icon} /> : icon}</span>
      </button>

      <Transition
        Tag="ul"
        open={active}
        // onClick={() => setActive(false)}
        base={`absolute right-0 max-h-[85vh] overflow-scroll no-srl-bar bg-bg dark:bg-dbg border border-bf rounded shadow-lg`}
        enter={`opacity-100 scale-100 ${mt} mr-0 translate-x-0 translate-y-0`}
        exit={`border-none opacity-0 scale-90 translate-x-4 translate-y-2`}
        time="200">
        {children}
      </Transition>
    </div>
  );
}
