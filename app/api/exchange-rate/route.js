import { getCurrenciesExchangeRates } from "../cron";

export async function GET(req) {
  if (!process.env.EXCHANGE_RATE) {
    process.env.EXCHANGE_RATE = JSON.stringify(await getCurrenciesExchangeRates());
  }
  return Response.json(JSON.parse(process.env.EXCHANGE_RATE));
}
