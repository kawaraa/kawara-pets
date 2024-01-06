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
  return getMetadata({ lang, title: content.h1[lang] });
}

const content = {
  title: { en: "Terms And Conditions", ar: "الأحكام والشروط" },
  h1: {
    en: `Welcome to ${siteName}, where we believe in enhancing the lives of your furry friends through quality products and exceptional service. As fellow pet lovers, we understand the joy and companionship these adorable creatures bring to our lives, and we're dedicated to providing you with everything you need to keep them happy, healthy, and tail-waggingly content`,
    ar: `مرحبًا بك في ${siteName}، حيث نؤمن بتعزيز حياة أصدقائك ذوي الفراء من خلال منتجات عالية الجودة وخدمة استثنائية. باعتبارنا محبين للحيوانات الأليفة، فإننا نتفهم السعادة والرفقة التي تجلبها هذه المخلوقات الرائعة لحياتنا، ونحن ملتزمون بتزويدك بكل ما تحتاجه لإبقائها سعيدة وصحية وممتعة.`,
  },
  h1P: {
    en: "The all-in-one local marketplace based e-commerce platform to start, run, and grow a business",
    ar: "السوق لمحلية المحلية التجارة الشاملة القائمة لبدء الأعمال التجارية وإدارتها وتنميتها",
  },
  articles: [
    {
      h: { en: `Story of ${siteName}`, ar: `قصة ${siteName}` },
      p: {
        en: `Founded in 2022, ${siteName} started with a simple mission to create a one-stop destination for pet owners seeking top-notch supplies and accessories. Our journey began with a passion for animals and a commitment to offering products that meet the diverse needs of pets and their devoted humans.`,
        ar: `تأسس ${siteName} بدأت بمهمة بسيطة وهي إنشاء وجهة شاملة لأصحاب الحيوانات الأليفة الذين يبحثون عن مستلزمات وإكسسوارات من الدرجة الأولى. بدأت رحلتنا بشغف بالحيوانات والالتزام بتقديم المنتجات التي تلبي الاحتياجات المتنوعة للحيوانات الأليفة والبشر المتفانين.`,
      },
    },
    {
      h: {
        en: "What We Offer",
        ar: "ما نقدمه",
      },
      p: {
        en: `At ${siteName}, we offer a diverse range of different product category that cater to different tastes and preferences. Whether you're searching for Grooming tools or looking to explore new additions to your Pet Collection, we've got you covered. Our inventory is constantly updated to keep up with the latest trends and meet your evolving needs`,
        ar: `في ${siteName}، نقدم مجموعة متنوعة من فئات المنتجات المختلفة التي تلبي مختلف الأذواق والتفضيلات. سواء كنت تبحث عن أدوات العناية بالحيوانات الأليفة أو تتطلع إلى استكشاف إضافات جديدة إلى مجموعة الحيوانات الأليفة الخاصة بك، فنحن نوفر لك كل ما تحتاجه. يتم تحديث مخزوننا باستمرار لمواكبة أحدث الاتجاهات وتلبية احتياجاتك المتطورة`,
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
