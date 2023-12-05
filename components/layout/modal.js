"use client";
import Transition from "./transition";
import { Button, IconButton } from "./button";
import SvgIcon from "./svg-icon";
import { cardBgCls } from "./tailwindcss-class";

export default function Modal({
  lang = "en",
  tag = "div",
  title,
  okBtn,
  open,
  loading,
  onCancel,
  onApprove,
  icon,
  center,
  children,
  ...p
}) {
  const c = center ? "top-1/2 -translate-y-1/2" : "bottom-10 md:bottom-1/2 md:translate-y-1/2";

  return (
    <>
      <Transition
        Tag="div"
        open={open}
        onClick={onCancel}
        base="fixed z-[1] inset-0 bg-black/30 transition-all ease-in-out duration-200"
        enter="opacity-100 backdrop-blur-[.5px]"
        exit="opacity-0 backdrop-blur-none"
        time="200"
        aria-hidden="true"></Transition>

      <Transition
        Tag={tag}
        base={`z-[1] fixed left-5 ${c} right-5 p-4 pt-10 overflow-hidden rounded-lg ${cardBgCls} md:min-w-[550px] md:max-w-xl mx-auto print:overflow-auto print:static print:top-0 print:text-t`}
        enter="opacity-100 md:scale-100"
        exit="opacity-0 translate-y-4 md:scale-75"
        time="300"
        open={open}
        aria-label={`${title} ${content.label[lang]}`}
        role="dialog"
        aria-modal="true"
        {...p}>
        {onCancel && (
          <IconButton
            icon="crossMark"
            onClick={onCancel}
            disabled={!!loading}
            title={content.cancel[lang]}
            cls="w-8 absolute top-3 right-3 hover:text-red print:hidden"
          />
        )}
        <div dir="ltr" className="block pb-4 md:flex justify-start">
          {icon && (
            <div
              className={`h-12 w-12 shrink-0 p-2 mx-auto mt-1 mb-3 md:mr-2 rounded-full ${
                icon === "warning" ? "bg-bg1 text-red" : "bg-pc text-t"
              }`}>
              {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}
            </div>
          )}

          <div dir="auto" className="flex-auto">
            <h4 className="mb-1 mx-8 text-lg text-center print:text-3xl font-semibold">{title}</h4>
            {children && (
              <div className="max-h-[70vh] mt-5 overflow-scroll no-srl-bar print:max-h-none print:overflow-auto">
                {children}
              </div>
            )}
          </div>
        </div>

        {(onApprove || p.onSubmit) && (
          <div className="text-right">
            <Button
              type={tag == "form" ? "submit" : ""}
              onClick={p.onSubmit ? null : onApprove}
              loading={loading}
              cls="print:hidden w-full md:w-auto justify-center py-2">
              {okBtn}
            </Button>
          </div>
        )}
      </Transition>
    </>
  );
}

const content = {
  cancel: { en: "Cancel and close the modal window", ar: "إلغاء وإغلاق النافذة" },
  label: { en: "modal window", ar: "نافذة مشروطة" },
};
