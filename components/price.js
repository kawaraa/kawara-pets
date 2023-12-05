import clsx from "clsx";
import supportedCurrencies from "../components/content/currencies.json";

const Price = ({ amount, currency, currencyCodeClassName, ...p }) => {
  return (
    <p suppressHydrationWarning={true} {...p}>
      {priceToString(amount, currency.rate, currency.code)}
      {/* {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}`} */}
      <span className={clsx("ml-1 inline text-xs", currencyCodeClassName)}>{`${currency.code}`}</span>
    </p>
  );
};

export default Price;

const priceToString = function (amount, rate, currency) {
  return `${supportedCurrencies[currency]}${(+amount * +rate).toFixed(2)}`;
};
