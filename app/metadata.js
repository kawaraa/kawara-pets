const siteName = process.env.SITE_NAME;
const baseUrl = new URL(process.env.NEXT_PUBLIC_HOST);
const twitterSite = process.env.TWITTER_SITE;

export default function getMetadata({ lang, title, description, keywords, author, data }) {
  return {
    title: { default: title || content.title[lang], template: `%s | ${siteName}` },
    description: description || content.description[lang],
    keywords: keywords || content.keywords[lang],
    category: "retail", // grocery
    authors: [author || content.author],
    icons: {
      shortcut: { type: "image/ico", sizes: "48x48", url: "/favicon.ico" },
      icon: { type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
      apple: { type: "image/png", sizes: "180x180", url: "/apple-touch-icon.png" },
      other: [
        { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
        { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
      ],
    },
    manifest: "/manifest.json",
    other: { google: "notranslate" },
    metadataBase: baseUrl,
    ...(data || {}),
    openGraph: {
      title: title || content.title[lang],
      description: description || content.description[lang],
      url: baseUrl,
      siteName,
      images: [{ url: `${baseUrl}/android-chrome-512x512.png`, width: 600, height: 600 }],
      type: "website",
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: title || content.title[lang],
      description: description || content.description[lang],
      siteId: "1467726470533754880",
      creator: "@kawarashop",
      creatorId: "1467726470533754880",
      images: [`${baseUrl}/android-chrome-512x512.png`],
      site: twitterSite,
    },
    appleWebApp: { title: "Kawara Shop", statusBarStyle: "black-translucent" },
    robots: {
      follow: true,
      index: true,
    },
  };
}

const content = {
  title: { en: "Kawara Shop - Web Shop", ar: "متجر ويب - Kawara Shop" },
  description: {
    en: "Kawara Shop is an web shop online store that serve a heigh quality products from different categories, order now and benefit the fast shipping.",
    ar: "Kawara Shop هو متجر إلكتروني يقدم منتجات عالية الجودة من فئات مختلفة، اطلب الآن واستفد من الشحن السريع",
  },
  keywords: {
    en: "Kawara Shop, web shop, online store, Marketplace, heigh quality products, product categories",
    ar: "Kawara Shop، متجر ويب، متجر على الإنترنت، سوق، منتجات عالية الجودة، فئات المنتجات",
  },
  author: { name: "Kawara Shop", url: baseUrl },
};
