import { serverRequest } from "../../../service/request";
const storeId = require("../../../service/config.json").storeId;
const optionNames = ["QUANTITY", "WEIGHT", "SIZE", "PACKAGING", "COLOR", "FLAVOR", "TYPE", "SCENT"];

export default async function getCjdropshippingProduct(link) {
  const product = await getProduct(link.split("-p-")[1].replace(".html", ""));
  const productOptionsNames = product.productKeyEn.split("-");

  const newVariants = product.variants.map((v) => {
    const options = v.variantKey.split("-").map((k, i) => {
      const name = optionNames.find((n) => new RegExp(n.slice(0, -1), "gim").test(productOptionsNames[i]));
      return { name: name || productOptionsNames[i], value: k };
    });

    return {
      barcode: v.vid.match(/\d+(\.\d+)?/g).join(""),
      imageUrl: v.variantImage,
      comparePrice: 0,
      price: Number.parseInt(v.variantSellPrice) + 10,
      quantity: 0,
      options: options,
    };
  });

  return {
    storeId,
    name: product.productNameEn,
    description: "",
    // description: product.description,
    vendor: "",
    category: "",
    variants: newVariants,
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
      media: product.productImageSet,
      maxQuantity: 1,
    },
  };
}

async function getProduct(pid) {
  const url = `https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`;
  const headers = { "Content-Type": "application/json", "CJ-Access-Token": process.env.accessToken };
  const response = await serverRequest(url, "GET", undefined, undefined, { headers }).catch((er) => er);
  if (response.data) return response.data;
  else if (/not found/gim.test(response?.message)) return {};
  else if (/api key|access token/gim.test(response?.message)) {
    await getAccessToken();
    return getProduct(pid);
  }
  throw response;
}

async function getAccessToken() {
  const url = "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";
  const email = process.env.CJDROPSHIPPING_API_USER;
  const password = process.env.CJDROPSHIPPING_API_KEY;
  const { message, data } = await serverRequest(url, "POST", { data: { email, password } });
  if (!/success/gim.test(message)) throw new Error(message);
  process.env.cjAccessToken = data.accessToken;
  process.env.cjRefreshToken = data.refreshToken;
}
