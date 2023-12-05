"use client";
import { useEffect, useState } from "react";
import Transition from "./transition";
import { ToggleSwitch } from "./inputs";
import SvgIcon from "./svg-icon";

export default function Collapse({ children, title, checked, onCheck, name, id, cls, hCls, Tag }) {
  // if (accordion) console.log("This a accordion, means only one panel can be expanded at a time.");
  const [active, setActive] = useState(checked || false);
  const headerClass = "flex w-full px-3 py-2";

  useEffect(() => {
    setActive(checked ? true : false);
  }, [checked]);

  return (
    <Tag className={`border border-bc dark:border-bf ${onCheck && "rounded-lg"} ${cls}`}>
      {onCheck ? (
        <div className={`${headerClass} justify-between ${active ? "rounded-t-lg" : "rounded-lg"} ${hCls} `}>
          {title}
          <ToggleSwitch name={name} cls={id} checked={checked} onChange={onCheck} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => !onCheck && setActive(!active)}
          aria-expanded={active}
          className={`${headerClass} ${hCls || "rounded-lg"} `}>
          <span className={`h-6 w-6 ${!active && "-rotate-90"} duration-300`}>
            <SvgIcon name="chevronDown" />
          </span>
          {title}
        </button>
      )}

      <Transition
        Tag="div"
        base="overflow-hidden p-2"
        enter="max-h-[1000px]"
        exit="max-h-[0px]"
        time="300"
        open={active}>
        {children}
      </Transition>
    </Tag>
  );
}
