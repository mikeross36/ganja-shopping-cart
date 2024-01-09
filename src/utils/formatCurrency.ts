const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});

export const formatCurrrency = (num: number) => {
  return CURRENCY_FORMATER.format(num);
};
