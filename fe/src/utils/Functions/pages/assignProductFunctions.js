export const updateAssignedProduct = (products, assignedProducts) => {
  console.log(products, assignedProducts);
  if (assignedProducts.lenght === 0) return products;
  let newProductList = products.map((product) => {
    assignedProducts.map((assignedProduct) => {
      if (product.id === assignedProduct.productId) {
        product.active = true;
        product.price = assignedProduct.price;
      }
    });
    return product;
  });
  return newProductList;
};
