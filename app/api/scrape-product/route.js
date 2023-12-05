// import { serverRequest } from "../../../service/request";

export async function POST(req) {
  try {
    const token = req.cookies.get("accessToken").value;
    const body = await req.json();
    if (!body.retailer) throw new Error("Retailer is a required");
    if (!body.link) throw new Error("Product link is a required");

    const data = await require(__dirname + handlers[body.retailer]).default(body.link);
    return Response.json({ data });
    // const res = await serverRequest("products", "POST", { token, body: { data } }).catch((er) => er);
    // if (!res.data) return Response.json({ data });
    // return Response.json({ success: true });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}

const handlers = { aliexpress: "/aliexpress", cjdropshipping: "/cjdropshipping" };
