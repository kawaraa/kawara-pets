// import { load } from "cheerio";
const puppeteer = require("puppeteer");
const path = require("path");
const optionNames = ["QUANTITY", "WEIGHT", "SIZE", "PACKAGING", "COLOR", "FLAVOR", "TYPE", "SCENT"];
const storeId = require("../../../service/config.json").storeId;

export default async function scrapeAliexpressProduct(link) {
  const index = link.indexOf("html?") < 0 ? link.length : link.indexOf("html?");
  link = link.slice(0, index < 0 ? index : index + 4);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  /** Scrape the aliexpress product page for details */
  await page.goto(link);
  const data = (await page.evaluate(() => runParams)).data;
  // intl_locale=en_US

  /** Scrape the description page for the product using the description url */
  await page.goto(data.productDescComponent.descriptionUrl);
  const descData = await page.evaluate(() => {
    const video = document.querySelector("video source")?.src;
    return {
      text: document.querySelector("tbody tr td div")?.textContent,
      images: [...Array.from(document.querySelectorAll("img")).map((img) => img.src), video],
    };
  });
  // textList.split("\n").map((t) => t.trim()).filter((t) => t),
  await browser.close();

  const { imagePathList, image250PathList, image640PathList } = data.imageComponent;

  const variants = extractAliexpressVariants(
    data.priceComponent.origPrice.maxPrice,
    data.priceComponent.skuPriceList,
    data.skuComponent.productSKUPropertyList
  );

  const images = new Set(
    [imagePathList, image250PathList, image640PathList, descData.images, variants.map((v) => v.imageUrl)]
      .flat()
      .map(cleanAliexpressImageLink)
      .filter((img) => img)
  );
  /** Build the JSON response with aliexpress product details */
  return {
    storeId,
    name: data.productInfoComponent.subject,
    description: descData.text || "",
    vendor: "",
    category: "",
    variants,
    meta: {
      shippableTo: {
        EU: link,
        US: "",
        CA: "",
        AU: "",
        TR: "",
        SA: "",
        AE: "",
        QA: "",
        OM: "",
        KW: "",
        BH: "",
      },
      media: Array.from(images),
      maxQuantity: 1,
    },
  };
}

function extractAliexpressVariants(maxPrice, priceLists = [], optionsLists = []) {
  return priceLists.map((list) => {
    const ids = list.skuPropIds.split(",");
    let imageUrl;

    const options = optionsLists.map((o) => {
      let value = o.skuPropertyValues.find((v) => ids.includes(v.propertyValueId + ""));
      if (!value) value = o.skuPropertyValues.find((v) => !ids.includes(v.propertyValueId + ""));
      if (value.skuPropertyImagePath) imageUrl = cleanAliexpressImageLink(value.skuPropertyImagePath);
      if (/ships/gim.test(o.skuPropertyName)) return null;
      const name = optionNames.find((n) => new RegExp(n.slice(0, -1), "gim").test(o.skuPropertyName));
      return {
        name: name || o.skuPropertyName,
        value: value.propertyValueDisplayName || value.propertyValueName,
      };
    });

    return {
      barcode: list.skuId + "",
      imageUrl,
      comparePrice: 0,
      price: maxPrice,
      quantity: 0,
      options: options.filter((o) => o),
    };
  });
}

function cleanAliexpressImageLink(link) {
  if (!link) return;
  const { origin, pathname } = new URL(link);
  if (!pathname.includes("-")) return link;
  const { dir, ext } = path.parse(pathname);
  return origin + dir + ext;
}
