"use client";
export default function Loader({ size = "10", screen, full, wrapperCls = "", cls = "" }) {
  let c = wrapperCls;
  let borderSize = Math.round(+size / 8);
  if (borderSize > 7) borderSize = 7;
  if (screen) c = "z-[1] fixed inset-0 flex justify-center items-center " + wrapperCls;
  else if (full) c = "absolute fixed inset-0 flex justify-center items-center " + wrapperCls;
  return (
    <div className={`flex justify-center items-center ml-1 ${c}`} role="img" aria-label="loading">
      <div
        className={`border-t-[transparent] border-gray-300 dark:border-slate-700 rounded-full animate-spin ${cls}`}
        style={{ width: `${size}px`, height: `${size}px`, borderWidth: `${borderSize}px` }}></div>
    </div>
  );
}
