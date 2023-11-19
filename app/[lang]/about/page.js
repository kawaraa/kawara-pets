import getMetadata from "../../metadata";
import Article from "../../../components/article";
const siteName = process.env.SITE_NAME || "";

export default function About({ params: { lang } }) {
  return (
    <section dir="auto" className="max-w-4xl mx-auto mb-20 pt-10 px-2">
      <p className="my-10 text-center text-3xl font-semibold">{content.title[lang]}</p>

      <h1 className="text-lg font-bold mt-8 mb-3">{content.h1[lang]}</h1>
      <p>{content.h1P[lang]}.</p>

      {content.articles.map((a, i) => (
        <Article lang={lang} article={a} key={i} />
      ))}
    </section>
  );
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  return getMetadata({ lang, title: content.h1[lang] + " - ALM" });
}

const content = {
  title: { en: `About ${siteName}`, ar: `معلومات عن ${siteName}` },
  h1: {
    en: `Welcome to ${siteName}, where we believe in bringing you the finest products with a touch of personalized service. Our journey began with a simple vision - to curate a collection that reflects quality, style, and uniqueness`,
    ar: `مرحبًا بك في ${siteName}، حيث نؤمن بتقديم أفضل المنتجات لك مع لمسة من الخدمة الشخصية. بدأت رحلتنا برؤية بسيطة - وهي تنسيق مجموعة تعكس الجودة والأناقة والتفرد`,
  },
  h1P: {
    en: "The all-in-one local marketplace based e-commerce platform to start, run, and grow a business",
    ar: "السوق لمحلية المحلية التجارة الشاملة القائمة لبدء الأعمال التجارية وإدارتها وتنميتها",
  },
  articles: [
    {
      h: { en: `Story of ${siteName}`, ar: `قصة ${siteName}` },
      p: {
        en: `Founded in 2022, ${siteName} has evolved from a passion project into a thriving online destination for [your product category]. What sets us apart is our commitment to sourcing products that not only meet high standards but also tell a story. Each item in our collection has been carefully selected to bring you joy, functionality, and a touch of luxury.`,
        ar: `تأسس ${siteName} في عام 2022، وقد تطور من مشروع شغوف إلى وجهة مزدهرة عبر الإنترنت لـ [فئة منتجك]. ما يميزنا هو التزامنا بتوفير المنتجات التي لا تلبي المعايير العالية فحسب، بل تحكي قصة أيضًا. تم اختيار كل منتج في مجموعتنا بعناية ليمنحك السعادة والعملية ولمسة من الفخامة.`,
      },
    },
    {
      h: {
        en: "What We Offer",
        ar: "ما نقدمه",
      },
      p: {
        en: `At ${siteName}, we offer a diverse range of different product category that cater to different tastes and preferences. Whether you're searching for Clothing or looking to explore new additions to your Gift collection, we've got you covered. Our inventory is constantly updated to keep up with the latest trends and meet your evolving needs`,
        ar: `في ${siteName}، نقدم مجموعة متنوعة من فئات المنتجات المختلفة التي تلبي مختلف الأذواق والتفضيلات. سواء كنت تبحث عن الملابس أو تتطلع إلى استكشاف إضافات جديدة إلى مجموعة الهدايا الخاصة بك، فنحن نوفر لك كل ما تحتاجه. يتم تحديث مخزوننا باستمرار لمواكبة أحدث الاتجاهات وتلبية احتياجاتك المتطورة`,
      },
    },
    {
      h: { en: "Our Commitment", ar: "التزاماتنا" },
      p: {
        en: [
          "Quality and customer satisfaction are at the heart of everything we do. We work closely with trusted suppliers and artisans to ensure that every product you receive is crafted with precision and care. Our customer service team is dedicated to providing prompt and friendly assistance, making your shopping experience seamless and enjoyable.",
          `Thank you for choosing ${siteName}. We're excited to be a part of your journey and look forward to serving you with passion and dedication.`,
          "Happy shopping!",
        ],
        ar: [
          "الجودة ورضا العملاء هي جوهر كل ما نقوم به. نحن نعمل بشكل وثيق مع الموردين والحرفيين الموثوقين لضمان أن كل منتج تتلقاه مصنوع بدقة وعناية. فريق خدمة العملاء لدينا مكرس لتقديم المساعدة السريعة والودية، مما يجعل تجربة التسوق الخاصة بك سلسة وممتعة.",
          `شكرًا لك على اختيار ${siteName}. يسعدنا أن نكون جزءًا من رحلتك ونتطلع إلى خدمتك بشغف وتفاني.`,
          "تسوق بسعادة!",
        ],
      },
    },
  ],
};
