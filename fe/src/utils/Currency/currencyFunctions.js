export const getCurrencySimbol = (currencyId) => {
  return currencyId === 1 ? "₡" : "$";
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function porcentageConverter(porcentage) {
  if (porcentage < 10) {
    return parseFloat("0.0" + porcentage.toString());
  }
  return parseFloat("0." + porcentage.toString());
}
