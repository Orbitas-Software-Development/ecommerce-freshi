export const orderDetailsDto = (productsSelected) => {
  var porcentageConverter = (porcentage) => {
    if (porcentage < 10) {
      return parseFloat("0.0" + porcentage.toString());
    }
    return parseFloat("0." + porcentage.toString());
  };
  try {
    let orderDetailsDto = productsSelected.map((value, index) => {
      return {
        boxes: value.quantity,
        productId: value.id,
        iva: value.iva,
        unitPrice: value.price,
        units: value.unitsPerBox * value.quantity,
        total: value.unitsPerBox * value.quantity * value.price,
        totalIva:
          value.unitsPerBox * value.quantity * value.price +
          value.unitsPerBox *
            value.quantity *
            value.price *
            porcentageConverter(value.iva),
      };
    });
    return orderDetailsDto;
  } catch (e) {
    console.log(e);
  }
};
