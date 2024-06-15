export const updateAssignedProduct = (products, assignedProducts) => {
  try {
    if (assignedProducts.lenght === 0) return products;
    let newProductList = products.map((product) => {
      assignedProducts.map((assignedProduct) => {
        if (product.id === assignedProduct.productId) {
          product.added = true;
          product.price = assignedProduct.price;
        }
      });
      return product;
    });
    return newProductList;
  } catch (e) {
    console.log(e);
  }
};

export const validateEmptyFields = (products) => {
  let productEmpty = false;
  products.map((product) => {
    if (product.added === true && !product?.price) {
      productEmpty = true;
    }
  });
  return productEmpty;
};
