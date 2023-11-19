export function random() {
  return Math.round(Math.random() * 800);
}

export function getCssDelay() {
  return { animationDelay: (Math.random() * 600).toFixed() + "ms" };
}

export function createUrl(pathname, params) {
  const paramsString = params.toString();
  return `${pathname}${paramsString.length ? "?" : ""}${paramsString}`;
}

export function extractLang(params, searchParams, cookieLang) {
  let lang = (params?.lang || searchParams?.lang || cookieLang)?.toLowerCase();
  return !/en|ar/gim.test(lang) ? "en" : lang;
}

export class Cookies {
  static set(name, value, expireDays = 180, date = new Date()) {
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;samesite=lax;`;
  }

  static get(name) {
    return Cookies.getAll()[name] || null;
  }
  static getAll() {
    return Cookies.parse(document.cookie);
  }
  static remove(name) {
    // To delete a cookie, Just set the expires parameter to a past date:
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  static parse(cookies) {
    const result = {};
    (cookies || "").split(";").forEach((str) => {
      const cookie = str.trim().split("=");
      result[cookie[0].trim()] = cookie[1];
    });
    return result;
  }
}

export function copyText(text = "", cb) {
  const copy = () => {
    try {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.value = text;
      input.select(); /* Select the text field */
      input.setSelectionRange(0, 99999); /* Select the text for mobile devices */
      document.execCommand("copy");
      input.remove();
    } catch (er) {
      if (cb) cb(false);
    }
    if (cb) cb(true);
  };
  if (!navigator.clipboard) return cb(false);
  navigator.clipboard.writeText(text).then(() => cb(true), copy);
}

export function validateError(error, lang) {
  let name = Object.keys(errors).find((errName) => error?.toLowerCase().includes(errName));
  return name ? errors[name][lang] : errors.default[lang];
}

const errors = {
  default: {
    en: "Something went wrong, please try again later",
    ar: "حدث خطأ ما، يرجى المحاولة فى وقت لاحق",
  },
  "invalid line item": {
    en: "Invalid line item, the product option is not valid",
    ar: "بند غير صالح، خيارات أو مواصفات المنتج غير صالحة",
  },
  "out of stock": {
    en: "The selected item is out of stock",
    ar: "العنصر المحدد غير متوفر في المخزون",
  },
  "payment error": {
    en: "Something went wrong with our payment provider, sorry for inconvenient!",
    ar: "حدث خطأ ما مع مزود خدمة الدفع لدينا، نأسف للإزعاج!",
  },
};
