import { serverRequest } from "../../../service/request";
const stripe = require("stripe")(process.env.STRIPE_SC_KEY);
const host = process.env.NEXT_PUBLIC_HOST;
const apiHost = process.env.NEXT_PUBLIC_API_HOST;

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang");
    const body = await req.json();

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

      const images = [v.imageUrl || meta.images[0]] || image?.data?.url;
      const product_data = { name, images, metadata: { productId: id, variantId: v.id } };
      //  product_data: { description:"Some data for reference" },
      return { quantity, price_data: { unit_amount: v.price * 100, currency: "eur", product_data } };
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
    // return Response.redirect(session.url); // This does not word with from end request function.
  } catch (error) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
