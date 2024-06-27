export const productSales = (orders) => {
  let productSales = [];

  orders.map((order) => {
    order.ordersDetails.map((orderDetail) => {
      console.log({
        OC: order.id,
        clientName: order.branch.client.name,
        branchName: order.branch.name,
        createdDate: order.createdDate,
        category: orderDetail.product.category.name,
        code: orderDetail.product.code,
        description: orderDetail.product.description,
        quantity: orderDetail.units,
        subtotal: orderDetail.total,
        iva: orderDetail.iva,
        total: orderDetail.totalIva,
      });
      productSales.push({
        OC: order.id,
        clientName: order.branch.client.name,
        branchName: order.branch.name,
        createdDate: order.createdDate,
        category: orderDetail.product.category.name,
        code: orderDetail.product.code,
        description: orderDetail.product.description,
        quantity: orderDetail.units,
        subtotal: orderDetail.total,
        iva: orderDetail.iva,
        total: orderDetail.totalIva,
      });
    });
  });
  return productSales;
};
