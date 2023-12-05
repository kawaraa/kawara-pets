import { serverRequest } from "./request";

export async function getCollection(vendor) {
  const query = `?filters[storeId][$eqi]=STORE_ID&filters[vendor][$eqi]=${vendor}&fields=id,name,meta&populate=image,ratings,variants,variants.options`;
  let data = (await serverRequest("product", "GET", { query })).data;
  return (data || []).map((product) => removeAttributes(product));
}

export async function getProducts(search = "", category, page, pageSize = 20, sort, direction) {
  search = decodeURI(search).replaceAll("-", " ").trim();

  const desc = pageSize != 1 ? "" : ",description";
  let query = `?filters[storeId][$eqi]=STORE_ID&fields=id,name,meta${desc}&populate=image,ratings,variants,variants.options`;

  if (search) {
    query += `&filters[$or][0][name][$contains]=${search}&filters[$or][1][description][$contains]=${search}&filters[$or][2][variants][barcode][$contains]=${search}`;
  }
  if (category) query += `&filters[category][$contains]=${category}`;
  if (Number.isNaN(page)) query += `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  if (sort && direction) query += `&sort=${sort}:${direction}`;

  let data = (await serverRequest("product", "GET", { query })).data;
  return (data || []).map((product) => removeAttributes(product));
}

export async function getProductBySlug(slug = "") {
  return (await getProducts(slug, null, 1, 1))[0];
}

export function removeAttributes(data) {
  if (!data?.attributes) return data;
  data.attributes.id = data.id;
  return data.attributes;
}

export function getGeoInfo(ip) {
  // https://ipinfo.io/json
  return serverRequest(`https://get.geojs.io/v1/ip/country/${ip}.json`, undefined, undefined, undefined, {
    cache: "no-store",
  }).catch(() => ({}));
}
