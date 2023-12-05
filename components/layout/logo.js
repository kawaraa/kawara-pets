import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
const { SITE_NAME } = process.env;

export default function Logo({ size }) {
  const siteName = SITE_NAME.split(" ");

  return (
    <Link href="/" className="mx-3 flex w-full items-center justify-center md:w-auto">
      <LogoSquare size={size} />
      <div className="ml-2 text-lg text-neutral-500 dark:text-neutral-400 font-bold uppercase whitespace-pre font-[sans-serif]">
        <div className="flex flex-col text-sm xs:flex-row xs:text-lg">
          <span className="mr-1 ">{siteName[0]}</span>
          <span className="text-red-400">{siteName[1]}</span>
        </div>
      </div>
    </Link>
  );
}

export function LogoSquare({ size }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black overflow-hidden",
        {
          "h-[40px] w-[40px] rounded-xl": !size,
          "h-[30px] w-[30px] rounded-lg": size === "sm",
        }
      )}>
      <LogoIcon
        className={clsx({
          "h-[16px] w-[16px]": !size,
          "h-[10px] w-[10px]": size === "sm",
        })}
      />
    </div>
  );
}

// style = "width: 512px; height: 512px; background: #262626";
export function LogoIcon() {
  return (
    <Image src="/kawara-pets-logo-transparent.png" priority width="100" height="100" alt="Kawara Shop Logo" />
  );
}
