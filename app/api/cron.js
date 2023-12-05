import { serverRequest } from "../../service/request";
import supportedCurrencies from "../../components/content/currencies.json";
const eurExchangeUrl = "https://api.frankfurter.app/latest?from=eur";
const otherExchangeUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`;

// export default async function handler(req, res) {
//   // https://vercel.com/docs/cron-jobs
//   // */10 * * * * Triggers every 10 minutes:
//   // 0 6 * * * Triggers at 6 AM every day

//   try {
//     process.env.EXCHANGE_RATE = JSON.stringify(await getCurrenciesExchangeRates());
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//     // return Response.json({ message: error.message }, { status: 400 });
//   }
// }

export async function getCurrenciesExchangeRates() {
  const rates = { EUR: 1 };
  const exchangeRates = (await serverRequest(eurExchangeUrl)).rates;
  const otherExchangeRates = (await serverRequest(otherExchangeUrl)).eur;

  Object.keys(supportedCurrencies).forEach((c) => {
    const lowerCaseK = c.toLowerCase();
    if (exchangeRates[c]) rates[c] = exchangeRates[c];
    else if (otherExchangeRates[lowerCaseK]) rates[c] = otherExchangeRates[lowerCaseK];
  });
  return rates;
}

// vercel.json
// {
//   "crons": [
//     {
//       "path": "/api/cron",
//       "schedule": "0 6 * * *"
//     }
//   ]
// }
