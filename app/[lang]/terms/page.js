import getMetadata from "../../metadata";
import { SectionLisItem } from "../../../components/article";
const siteName = process.env.SITE_NAME || "";

export default function Terms({ params: { lang } }) {
  return (
    <article dir="auto" className="max-w-4xl mx-auto mb-20 pt-10 px-2">
      <h1 className="text-3xl text-center font-bold mt-8 mb-3 text-3xl font-semibold">{content.h1[lang]}</h1>
      <p>{content.p[lang]}.</p>

      <ol className="">
        {content.sections.map((s, i) => (
          <SectionLisItem lang={lang} content={s} itemNumber={i + 1} key={i} />
        ))}
      </ol>
    </article>
  );
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  return getMetadata({ lang, title: content.h1[lang] });
}

const content = {
  h1: {
    en: "Terms And Conditions",
    ar: "الأحكام والشروط",
  },
  p: {
    en: `Welcome to ${siteName}! By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.`,
    ar: `مرحبًا بك في ${siteName}! من خلال الوصول إلى موقعنا واستخدامه، فإنك توافق على الالتزام بالشروط والأحكام التالية والالتزام بها. يرجى قراءتها بعناية.`,
  },
  sections: [
    {
      h: { en: "Acceptance of Terms", ar: "قبول الشروط" },
      p: {
        en: `By using the ${siteName} online store (the "Service"), you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions, please do not use our Service.`,
        ar: `باستخدام متجر ${siteName} عبر الإنترنت ("الخدمة")، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على جميع الشروط والأحكام، فيرجى عدم استخدام خدمتنا.`,
      },
    },
    {
      h: {
        en: "Online Store Overview",
        ar: "نظرة عامة على المتجر الإلكتروني",
      },
      p: {
        en: `The ${siteName} online store provides a platform for the sale of Pet Supplies. By placing an order through our Service, you agree to provide accurate, current, and complete information about yourself.`,
        ar: `يوفر متجر ${siteName} عبر الإنترنت منصة لبيع مستلزمات الحيوانات الأليفة. من خلال تقديم طلب من خلال خدمتنا، فإنك توافق على تقديم معلومات دقيقة وحديثة وكاملة عن نفسك.`,
      },
    },
    {
      h: { en: "Orders and Payment", ar: "الطلبات والدفع" },
      p: {
        en: [
          "Order Acceptance: Your order is an offer to buy our products. We reserve the right to accept or reject any order for any reason",
          "Pricing: All prices are listed in EUR, USD, GBP, CAD, AUD and are subject to change without notice.",
          "Payment: Payment can be made through Visa, MasterCard, American Express, Discover, Visa Debit, MasterCard Debit, Maestro, Apple Pay, Google Pay, Samsung and more.",
        ],
        ar: [
          "قبول الطلب: طلبك هو عرض لشراء منتجاتنا. نحن نحتفظ بالحق في قبول أو رفض أي طلب لأي سبب من الأسباب",
          "التسعير: جميع الأسعار مدرجة باليورو والدولار الأمريكي والجنيه الإسترليني والدولار الكندي والدولار الأسترالي وتخضع للتغيير دون إشعار مسبق.",
          "الدفع: يمكن إجراء الدفع من خلال Visa وMasterCard وAmerican Express وDiscover وVisa Debit وMasterCard Debit وMaestro وApple Pay وGoogle Pay وSamsung والمزيد.",
        ],
      },
    },
    {
      h: { en: "Shipping and Delivery", ar: "الشحن والتسليم" },
      p: {
        en: [
          "Shipping Policies: We offer shipping to the United States and United Kingdom. Shipping costs and estimated delivery times are provided during the checkout process.",
          "Order Processing: Orders are typically processed within 3 - 8 business days. Please note that processing times may vary during peak seasons and that may cause a delay.",
          `Shipping Delays: ${siteName} is not responsible for delays in shipping caused by circumstances beyond our control, such as customs delays, natural disasters, or carrier-related issues.`,
          "Pre-ordered & Back-ordered items: If your order contains a pre-ordered or back-ordered item, we will ship any items we have available immediately and ship the items that are pre-ordered or back-ordered immediately when we have them available. So if you ordered more than one item in a single order and received only a part of your item don't worry, you will receive your other items shortly after.",
        ],
        ar: [
          "سياسات الشحن: نحن نقدم الشحن إلى الولايات المتحدة والمملكة المتحدة. يتم توفير تكاليف الشحن وأوقات التسليم المقدرة أثناء عملية الدفع.",
          "معالجة الطلب: تتم معالجة الطلبات عادةً خلال 3 - 8 أيام عمل. يرجى ملاحظة أن أوقات المعالجة قد تختلف خلال مواسم الذروة وقد يتسبب ذلك في حدوث تأخير.",
          `تأخيرات الشحن: ${siteName} ليس مسؤولاً عن التأخير في الشحن الناجم عن ظروف خارجة عن إرادتنا، مثل التأخير الجمركي أو الكوارث الطبيعية أو المشكلات المتعلقة بشركة النقل.`,
          "العناصر التي تم طلبها مسبقًا أو تم طلبه مرة أخرى: إذا كان طلبك يحتوي على عنصر تم طلبه مسبقًا أو تم طلبه مرة أخرى، فسنشحن أي عناصر متوفرة لدينا على الفور ونشحن العناصر التي تم طلبها مسبقًا أو تم طلبها مسبقًا على الفور عندما نحصل عليها متاح. لذا، إذا قمت بطلب أكثر من عنصر واحد في طلب واحد واستلمت جزءًا فقط من العنصر الخاص بك، فلا تقلق، فسوف تتلقى العناصر الأخرى بعد فترة وجيزة.",
        ],
      },
    },
    // {
    //   h: { en: "Returns and Refunds", ar: "الأستبدال والترجيع" },
    //   p: {
    //     en: "Please refer to our Returns and Refunds policy for information on returning products and receiving refunds.",
    //     ar: "",
    //   },
    // },
    {
      h: { en: "Intellectual Property", ar: "الملكية الفكرية" },
      p: {
        en: `All content included on this site, such as text, graphics, logos, images, and software, is the property of ${siteName} and is protected by international copyright laws.`,
        ar: `جميع المحتويات المضمنة في هذا الموقع، مثل النصوص والرسومات والشعارات والصور والبرامج، هي ملك لـ ${siteName} ومحمية بموجب قوانين حقوق الطبع والنشر الدولية.`,
      },
    },
    // {
    //   h: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    //   p: {
    //     en: "Our Privacy Policy governs the collection, use, and disclosure of personal information on the ${siteName} online store.",
    //     ar: "",
    //   },
    // },
    {
      h: { en: "Changes to Terms and Conditions", ar: "التغييرات في الشروط والأحكام" },
      p: {
        en: "We reserve the right to update, change, or replace any part of these Terms and Conditions. It is your responsibility to check our website periodically for changes.",
        ar: "نحن نحتفظ بالحق في تحديث أو تغيير أو استبدال أي جزء من هذه الشروط والأحكام. تقع على عاتقك مسؤولية مراجعة موقعنا بشكل دوري لمعرفة التغييرات.",
      },
    },
    {
      h: { en: "Contact Information", ar: "معلومات الاتصال" },
      p: {
        en: `If you have any questions about these Terms and Conditions, please contact us at Contact Page. Thank you for shopping at ${siteName}!`,
        ar: `إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى الاتصال بنا على صفحة الاتصال. شكرًا لك على التسوق في ${siteName}!`,
      },
    },
  ],
};
