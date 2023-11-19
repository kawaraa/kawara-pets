import { Suspense } from "react";
const stripe = require("stripe")(process.env.STRIPE_SC_KEY);

export default async function Success({ params: { lang }, searchParams: { session_id } }) {
  if (session_id) await stripe.checkout.sessions.expire(session_id).catch((e) => e);

  return (
    <Suspense>
      <article className="h-[70vh] mx-2 flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-6 text-center text-red-400">{content.h1[lang]} </h1>
        <p className="text-center">{content.p[lang][0]} </p>
        <p className="text-center">{content.p[lang][1]} </p>
      </article>
    </Suspense>
  );
}

const content = {
  h1: { en: "Oh, the order has been canceled", ar: "أوه، لقد تم إلغاء الطلب" },
  p: {
    en: [
      "Seems you changed your mind, we are sorry if it was us!",
      "but you can always go to the shopping cart and checkout again.",
    ],
    ar: [
      "يبدو أنك غيرت رأيك، نحن آسفون إذا كان بسببنا!",
      "ولكن يمكنك دائمًا الانتقال إلى عربة التسوق ومحاولة الطلبك مرة أخرى.",
    ],
  },
};
