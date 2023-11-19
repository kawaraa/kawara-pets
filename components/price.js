import clsx from "clsx";

const Price = ({ amount, currencyCode = "USD", currencyCodeClassName, ...p }) => (
  <p suppressHydrationWarning={true} {...p}>
    {`${new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(parseFloat(amount))}`}
    <span className={clsx("ml-1 inline", currencyCodeClassName)}>{`${currencyCode}`}</span>
  </p>
);

export default Price;
