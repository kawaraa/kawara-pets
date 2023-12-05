import { serverRequest } from "../../../service/request";

export async function POST(req) {
  await serverRequest(process.env.GOOGLE_APP_SCRIPT_URL, "POST", { body: await req.json() });
  return Response.json({ success: true });
}
