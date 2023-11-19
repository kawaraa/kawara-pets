import { Suspense } from "react";
import { load } from "cheerio";
import SvgIcon from "../../../components/layout/svg-icon";
import { serverRequest } from "../../../service/request";
import EmptyCartAndPrintReceipt from "./empty-cart-and-print-receipt";
const stripe = require("stripe")(process.env.STRIPE_SC_KEY);

export default async function Cancel({ params: { lang }, searchParams: { session_id } }) {
  let customerName = content.customerName[lang];
  let $receipt = "";

  const session = await stripe.checkout.sessions.retrieve(session_id).catch((e) => e);
  const key = session.payment_status == "paid" ? "success" : "error";

  if (key == "success") {
    const payment = await stripe.paymentIntents.retrieve(session.payment_intent, {
      expand: ["latest_charge"],
    });

    $receipt = load(await serverRequest(payment.latest_charge.receipt_url, "GET", null, "text/html"));
    $receipt(".Section.Copy").remove();
    $receipt(".Section.Divider.Divider--small").remove();
    $receipt(".Section.Section--last.Divider.Divider--large").remove();
    $receipt(".st-Divider.st-Width.st-Width--mobile").remove();
    $receipt(".Section.Header").remove();
    $receipt = $receipt.html();

    if (session?.customer) {
      customerName = await stripe.customers.retrieve(session.customer)?.name;
    }
  }

  return (
    <Suspense>
      <article className="h-[70vh] mx-2 flex flex-col items-center justify-center">
        <div className={`w-24 mb-6 ${content[key].cls}`}>
          <SvgIcon name={content[key].icon} />
        </div>
        <h1 className="text-center text-2xl mb-6">
          {content[key].h1[lang]}
          {customerName ? ` ${customerName}` : ""}
        </h1>
        <p className="text-center">{content[key].p[lang][0]}</p>
        <p className="text-center">{content[key].p[lang][1]}</p>

        <EmptyCartAndPrintReceipt lang={lang} html={$receipt} />
      </article>
    </Suspense>
  );
}

const content = {
  customerName: { en: "Dear", ar: "عزيزي" },
  success: {
    h1: { en: "Thanks for your order", ar: "شكرا على لطلبك" },
    p: {
      en: [
        "We will prepare your order and ship it to you as soon as possible",
        "You will receive the tracking number once it's shipped",
      ],
      ar: ["سنقوم بإعداد طلبك وشحنه إليك في أقرب وقت ممكن", "سوف تتلقى رقم التتبع بمجرد تم شحنه"],
    },
    icon: "checkMark",
    cls: "text-green-500",
  },
  error: {
    h1: { en: "An error happened", ar: "حدث خطأ" },
    p: {
      en: [
        "Something went wrong with the payment process, Sorry for inconvenient!",
        "Please try again later",
      ],
      ar: ["حدث خطأ ما أثناء عملية الدفع، نأسف للإزعاج!", "الرجاء معاودة المحاولة في وقت لاحق"],
    },
    icon: "crossMark",
    cls: "text-red-400",
  },
};
