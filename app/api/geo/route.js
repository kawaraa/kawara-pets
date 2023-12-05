import countryCodes from "k-utilities/geo-and-timezone/get-country-by-timezone";
import { getGeoInfo } from "../../../service/api-provider";

const dynamic = "force-dynamic";
export async function GET(req) {
  // x-forwarded-for: https://vercel.com/docs/edge-network/headers#x-forwarded-for
  const ip = new URL(req.url).searchParams.get("ip");
  const timezone = new URL(req.url).searchParams.get("timezone");

  return Response.json(ip ? await getGeoInfo(ip) : countryCodes(timezone));
}
