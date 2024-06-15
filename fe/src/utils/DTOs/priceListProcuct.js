export const priceListDto = (priceList, products) => {
  console.log(priceList);
  console.log(products);
  const newProductList = [];

  products.map((product) => {
    try {
      if (product?.price) {
        console.log(product?.price);
        product.price = parseFloat(
          product.price
            .toString()
            .replace(",", "")
            .replace(priceList.currencyId === 1 ? "₡" : "$", "")
        );
        console.log(product?.price);
      }
    } catch (e) {
      console.log(e);
    }
    if (product?.added && product?.price > 0) {
      newProductList.push({
        priceListId: priceList.id,
        productId: product.id,
        price: product.price,
      });
    }
  });
  return newProductList;
};
