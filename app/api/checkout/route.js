import getCountryByTimezone from "k-utilities/geo-and-timezone/get-country-by-timezone";
import { serverRequest } from "../../../service/request";
import { getCurrenciesExchangeRates } from "../cron";
import euCountries from "../../../components/content/eu-countries.json";
import { getGeoInfo } from "../../../service/api-provider";

const stripe = require("stripe")(process.env.STRIPE_SC_KEY);
const host = process.env.NEXT_PUBLIC_HOST;
const apiHost = process.env.NEXT_PUBLIC_API_HOST;

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang");
    let currency = searchParams.get("currency");
    const ip = searchParams.get("ip");
    let { country } = ip ? await getGeoInfo(ip) : getCountryByTimezone(searchParams.get("timezone"));

    const body = await req.json();

    if (process.env.NEXT_PUBLIC_HOST?.includes("localhost") || euCountries[country]) country = "EU";

    if (!process.env.EXCHANGE_RATE) {
      process.env.EXCHANGE_RATE = JSON.stringify(await getCurrenciesExchangeRates());
    }
    const currencyRate = JSON.parse(process.env.EXCHANGE_RATE)[currency] || 1;
    if (!currencyRate || currencyRate == 1) currency = "EUR";

    const productIds = body.lineItems.reduce((acc, it, i) => {
      return acc + `&filters[id][$in][${i}]=${it.productId}`;
    }, "");

    const query = `?filters[storeId][$eqi]=STORE_ID${productIds}&fields=id,name,meta&populate=image,variants,variants.options&pagination[page]=1&pagination[pageSize]=50`;

    const { data } = await serverRequest(`${apiHost}/api/products${query}`, "GET");

    const line_items = data.map(({ id, attributes: { name, variants, image, meta } }) => {
      let quantity = 1;

      const v = variants.find((v) => {
        const item = body.lineItems.find((line) => line.variantId == v.id);
        if (item && meta.maxQuantity > +item.quantity) quantity = +item.quantity;
        return item;
      });

      if (!v) throw new Error("invalid line item.");
      if (v.quantity < quantity) throw new Error("item is out of stock.");
      if (typeof meta.shippableTo[country] != "string") {
        throw new Error(`This item can not be shipped to "${country}"`);
      }
      const options = v.options.map((o) => o.value).join(" / ");
      const images = [v.imageUrl || meta.media[0]] || image?.data?.url;

      return {
        quantity,
        price_data: {
          unit_amount: Number.parseInt(+currencyRate * +v.price * 100),
          currency,
          product_data: {
            name,
            images,
            metadata: {
              productId: id,
              variantId: v.id,
              options,
              sourceLink: meta.shippableTo[country] || meta.shippableTo.EU,
            },
            // description: "Some data for reference",
          },
        },
      };
    });

    const session = await stripe.checkout.sessions
      .create({
        mode: "payment",
        line_items,
        billing_address_collection: "required",
        success_url: `${host}/${lang}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${host}/${lang}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      })
      .catch((e) => console.log("Checkout Error >>> ", e));

    if (!session?.url) throw new Error("payment error.");

    return Response.json({ redirectTo: session.url });
  } catch (error) {
    console.log("Payment Error: >>> ", error);
    return Response.json({ message: error.message }, { status: 400 });
  }
}
