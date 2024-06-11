export const priceListDto = (priceList, products) => {
  console.log(priceList);
  console.log(products);
  const newProductList = [];

  products.map((product) => {
    try {
      product.price = parseFloat(
        product?.price
          .replace(priceList.currencyId === 2 ? "$" : "₡", "")
          .replace(",", "")
      );
    } catch (e) {
      console.log(e);
    }
    if (product?.active && product?.price > 0) {
      newProductList.push({
        priceListId: priceList.id,
        productId: product.id,
        price: product.price,
      });
    }
  });
  return newProductList;
};
