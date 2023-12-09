import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridMediaTile({ lang, isInteractive = true, active, label, ...props }) {
  return (
    <div
      className={clsx(
        "relative group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-neutral-900",
        {
          "border-2 border-blue-600": active,
          "border-neutral-200 dark:border-neutral-800": !active,
        }
      )}>
      {props.src && props.src.match(/video|mp4/gim) ? (
        <>
          <video muted title={props.alt} poster={props.poster} className="w-full h-auto">
            <source src={props.src} type="video/mp4" />
            {props.alt}
          </video>
          <Image
            src="/play-arrow.png"
            width="50"
            height="50"
            alt={content.play[lang]}
            priority={true}
            className="absolute"
          />
        </>
      ) : (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx("h-full w-full object-contain", {
            "transition duration-300 ease-in-out group-hover:scale-105": isInteractive,
          })}
          {...props}
        />
      )}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currency={label.currency}
          position={label.position}
        />
      ) : null}
    </div>
  );
}

const content = {
  play: { en: "Video Play Button", ar: "زر تشغيل الفيديو" },
};
