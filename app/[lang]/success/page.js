import { Suspense } from "react";
import { load } from "cheerio";
import SvgIcon from "../../../components/layout/svg-icon";
import { serverRequest } from "../../../service/request";
import EmptyCartAndPrintReceipt from "./empty-cart-and-print-receipt";
const storeId = require("../../../service/config.json").storeId;
const stripe = require("stripe")(process.env.STRIPE_SC_KEY);
const token = process.env.STRAPI_TOKEN;

export default async function Cancel({ params: { lang }, searchParams: { session_id } }) {
  const ops = { expand: ["line_items.data.price.product"] };
  const session = await stripe.checkout.sessions.retrieve(session_id, ops).catch((e) => e);
  const name = session?.customer_details?.name || content.customerName[lang];
  const key = session.payment_status;
  let scriptUrl = `${process.env.GOOGLE_APP_SCRIPT_URL}?session=${session_id}&status=${key}`;
  let $receipt = "";
  let payment = null;

  if (key == "paid") {
    payment = await stripe.paymentIntents.retrieve(session.payment_intent, {
      expand: ["latest_charge"],
    });
    scriptUrl += `&payment=${payment.id}`;
    $receipt = load(await serverRequest(payment.latest_charge.receipt_url, "GET", null, "text/html"));
    $receipt(".Section.Copy").remove();
    $receipt(".Section.Divider.Divider--small").remove();
    $receipt(".Section.Section--last.Divider.Divider--large").remove();
    $receipt(".st-Divider.st-Width.st-Width--mobile").remove();
    $receipt(".Section.Header").remove();
    $receipt = $receipt.html();

    // Decrease "quantity" from the product stock
    const lineItems = session.line_items.data.map(({ quantity, price: { product } }) => {
      return { ...product.metadata, quantity };
    });
    if (!payment?.metadata?.status) {
      for (const item of lineItems) {
        const ops = { query: `/${item.productId}?fields=id&populate=variants` };
        const p = (await serverRequest("product", "GET", ops)).data;
        p.attributes.variants.forEach((v) => v.id == item.variantId && (v.quantity -= +item.quantity));
        const data = { storeId, variants: p.attributes.variants };
        serverRequest("product", "PUT", { token, query: `/${p.id}`, body: { data } });
      }
    }
    stripe.paymentIntents.update(session.payment_intent, {
      metadata: { session_id, status: "PENDING", storeId },
    });
  }

  // Notify The Admin about the new order and save it in Google Spreadsheet only on "production"
  if (!process.env.NEXT_PUBLIC_HOST.includes("localhost")) {
    serverRequest(scriptUrl).catch((e) => console.log("notifyTheAdmin Error: >>> ", e));
  }

  return (
    <Suspense>
      <article className="h-[70vh] mx-2 flex flex-col items-center justify-center">
        <div className={`w-24 mb-6 ${content[key].cls}`}>
          <SvgIcon name={content[key].icon} />
        </div>
        <h1 className="text-center text-2xl mb-6">
          {content[key].h1[lang]} {name}
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
  paid: {
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
  unpaid: {
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
