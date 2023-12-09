const confirmationEmailTemplate = require("../../../components/email-template/confirmation.hbs");
const stripe = require("stripe")(process.env.STRIPE_SC_KEY);
const mailTransporter = require("nodemailer").createTransport({
  service: "gmail",
  auth: { user: process.env.NODEMAILER_USER, pass: process.env.NODEMAILER_PASS },
});
const strapiToken = process.env.STRAPI_TOKEN;
const storeId = require("../../../service/config.json").storeId;

export async function GET(req) {
  try {
    const token = req.cookies.get("accessToken").value;
    if (token != strapiToken) throw new Error("Bad request");
    const status = new URL(req.url).searchParams.get("status");

    const cb = async ({ id, metadata: { session_id, status } }) => {
      const ops = { expand: ["line_items.data.price.product"] };
      const session = await stripe.checkout.sessions.retrieve(session_id, ops);
      const { name, email, phone, address } = session.customer_details;
      const lineItems = session.line_items.data.map(({ quantity, price: { product } }) => {
        return { name: product.name, imageUrl: product.images[0], ...product.metadata, quantity };
      });

      return { paymentId: id, status, name, email, phone, address, lineItems };
    };

    const options = {
      limit: 50,
      query: `status:'succeeded' AND metadata['storeId']:'${storeId}' AND metadata['status']:'${status}'`,
    };
    const payments = await Promise.all((await stripe.paymentIntents.search(options)).data.map(cb));

    return Response.json(payments);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const paymentId = new URL(req.url).searchParams.get("payment_id");
    const p = await stripe.paymentIntents.update(paymentId, { metadata: { status: "FULFILLED" } });
    const { customer_details } = await stripe.checkout.sessions.retrieve(p.metadata.session_id);

    // Todo:
    // const lang = check customer details in stripe if we can find what country the customer from || "en";
    // List the line items in the Email like this: kwashoping/api/src/domain/email-template/order-confirmation.hbs
    // or Send the receipt or the receipt url to the customer

    const message = getMailMessage(customer_details.email, customer_details.name, "confirmation");

    const info = await new Promise((res, rej) =>
      mailTransporter.sendMail(message, (er, info) => (er ? rej(er) : res(info)))
    );
    // console.log("Message sent: " + info.messageId);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

function getMailMessage(receiver, name, type, lang = "en") {
  return {
    from: '"Kawara Shop" <pets@kawaraa.com>', // sender address
    to: receiver, // list of receivers
    replyTo: "pets@kawaraa.com",
    subject: content[type].subject[lang], // Subject line
    html: content[type].template({ name, ...content[type].body[lang] }), // html body
  };
}

const content = {
  confirmation: {
    subject: { en: "Purchase Confirmation", ar: "تاكيد عملية الشراء" },
    template: confirmationEmailTemplate,
    body: {
      en: {
        hi: "Hi",
        h1: "Your order on has been confirmed",
        p: [
          "Welcome to",
          "We appreciate your business! We will package your order and ship it to you within 24 hours",
          "We hope you will like our products and service",
          "Best regards,",
          "Kawara Pets Team",
        ],
      },
      ar: {
        hi: "مرحبًا",
        h1: "شكرا على الشراء وأهلا بكم في",
        p: [
          "سنقوم بتغليف طلبك وإرساله إليك في أقرب وقت ممكن",
          "نأمل أن تعجبك منتجاتنا وخدماتنا",
          "أطيب التحيات،",
          "فريق كاوارا للحيوانات الأليفة",
        ],
      },
    },
  },
};
