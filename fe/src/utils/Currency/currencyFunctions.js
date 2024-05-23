export const getCurrencySimbol = (currencyId) => {
  return currencyId === 1 ? "₡" : "$";
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
