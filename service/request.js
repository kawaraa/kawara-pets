import config from "./config.json";
config.apiHost = process.env.NEXT_PUBLIC_API_HOST;

export function getURL(key) {
  return !config[key] ? null : config.apiHost + config[key];
}

export async function serverRequest(url, method = "GET", data, type = "application/json", arg = {}) {
  let aUrl = getURL(url) || url;
  const headers = { "Content-Type": type };
  let body = null;

  if (data) {
    if (data.token) headers.Authorization = `Bearer ${data.token}`;
    if (data.query) aUrl += data.query;
    if (data.body) body = JSON.stringify(data.body);
  }

  aUrl = aUrl.replace("STORE_ID", config.storeId);
  const response = await fetch(aUrl, { method, body, headers, ...arg });
  if (response?.ok) return type.includes("json") ? response.json() : response.text();
  throw new Error(await response?.text());
}

export async function request(url, method = "GET", data, type = "application/json", arg = {}) {
  const token = window.localStorage.getItem("accessToken");
  const headers = {};
  let body = null;
  let aUrl = getURL(url) || url;

  const prepareBody = (data) => {
    body = JSON.stringify(data);
    headers["Content-Type"] = type;
  };

  if (token) headers.Authorization = `Bearer ${token}`;
  if (data) {
    if (data.append) body = data;
    else if (!data.query) prepareBody(data);
    else {
      aUrl += data.query;
      if (data.body?.append) body = data.body;
      else if (data.body) prepareBody(data.body);
    }
  }

  aUrl = aUrl.replace("STORE_ID", config.storeId);
  const response = await fetch(aUrl, { method, body, headers, ...arg }).catch((err) => err);
  if (response?.ok) return type.includes("json") ? response.json() : response.text();
  throw new Error(response?.message || (await response?.text()));
}
