"use client";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AppSessionContext } from "../../app/app-session-context";
import { IconButton } from "./button";

export default function ImagePreview({}) {
  const pathname = usePathname();
  const { lang } = useContext(AppSessionContext);
  const [src, setSrc] = useState(null);

  const handler = ({ target }) => {
    if (target.tagName != "IMG" || !target.className?.includes("preview")) return;
    setSrc(target.src);
  };

  useEffect(() => {
    setSrc(null);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  if (!src) return null;
  return (
    <div className="z-[1] fixed inset-0 bg-bg bg-black/30 backdrop-blur-[10px]">
      <IconButton
        onClick={() => setSrc(null)}
        icon="crossMark"
        cls="w-12 absolute top-3 right-3 !p-2 text-orange-300 bg-black/10 rounded-full"
      />
      <div
        onClick={(e) => e.target.id == "img-container" && setSrc(null)}
        id="img-container"
        className="overflow-auto w-full h-full flex justify-center items-center no-srl-bar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={content.alt[lang]} className="max-w-full md:max-h-full lazy-c" />
      </div>
    </div>
  );
}

const content = {
  alt: { en: "Image preview", ar: "معاينة الصورة" },
};
