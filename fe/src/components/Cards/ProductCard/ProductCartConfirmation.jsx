import { React, useState } from "react";
import productStore from "../../../stores/productStore";
import { NumericFormat } from "react-number-format";
import "react-toastify/dist/ReactToastify.css";
import { getCurrencySimbol } from "../../../utils/Currency/currencyFunctions";
import clientPriceListStore from "../../../stores/clientPriceList";
export default function ProductCartConfirmation({ product }) {
  //global
  const deleteProduct = productStore((state) => state.deleteProduct);
  const addedProducts = productStore((state) => state.addedProducts);
  const setProducts = productStore((state) => state.setProducts);
  const productListGlobalState = productStore((state) => state.products);
  const clientPriceList = clientPriceListStore(
    (state) => state.clientPriceList
  );
  //local
  const [productSum, setProductSum] = useState(product.quantity);

  const addProduct = (product) => {
    //var productExisted = false;
    /*if (productListGlobalState.length === 0) {
      return addedProducts(product);
    }*/
    let productList = productListGlobalState.map((productListed) => {
      if (product.id === productListed.id) {
        productListed.quantity = product.quantity;
        // productExisted = true;
      }
      return productListed;
    });
    setProducts(productList);
    /*if (!productExisted) {
      addedProducts(product);
    }*/
  };
  const getTotalPrizeNumber = () => {
    let totalPrize = 0;

    productListGlobalState.map((product) => {
      totalPrize = product.price * product.unitsPerBox * product.quantity;
    });
    return totalPrize;
  };
  return (
    <div className=" rounded-md w-[302px] m-4 bg-gray-50 border pb-2">
      <div className="w-[300px] rounded-md">
        <img
          src={`data:image/jpeg;base64,${product.base64Image}`}
          alt=""
          className="rounded-t-md"
        />
      </div>
      <div className="p-2">
        <div className="flex justify-center text-xl">
          Unidades por caja: <b> {product.unitsPerBox}</b>
        </div>
        <div className="flex justify-center text-xl">
          <p htmlFor="productPrice" className="">
            Precio por Unidad:
          </p>
          <NumericFormat
            className="w-[0px] font-semibold border rounded-md px-2 bg-slate-200 flex-1 text-center"
            value={product.price}
            thousandSeparator=","
            decimalScale={2}
            prefix={getCurrencySimbol(clientPriceList?.priceList?.currencyId)}
            id="productPrice"
            disabled
          />
        </div>
        <p className="text-center text-xl">
          Ingrese número de <b>Cajas:</b>
        </p>
        <div className="flex justify-center">
          <button
            className=" bg-blue-200 hover:bg-blue-300 rounded-md  py-1 px-2 text-xl flex-1"
            type="button"
            onClick={(e) => {
              if (product.quantity > 1) {
                addProduct({ ...product, ["quantity"]: product.quantity - 1 });
              }
            }}
          >
            <i class="fa-solid fa-minus"></i>
          </button>

          <input
            type="text"
            value={product?.quantity}
            className="w-[180px] text-center bg-slate-200 rounded-md text-xl font-semibold flex-1 mx-1"
            onChange={(e) => {
              e.target.value > 0 &&
                addProduct({
                  ...product,
                  ["quantity"]: parseInt(e.target.value),
                });
            }}
          />
          <button
            className=" bg-blue-300 hover:bg-blue-400 rounded-md  py-1 px-2 text-xl flex-1"
            type="button"
            onClick={(e) => {
              addProduct({ ...product, ["quantity"]: product.quantity + 1 });
            }}
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="text-xl my-1  flex justify-center">
          <label htmlFor="total" className="flex-1">
            Total:
          </label>
          <NumericFormat
            className="text-center w-[180px] font-semibold border rounded-md px-2 bg-slate-200 flex-1"
            value={product.price * product.unitsPerBox * product.quantity}
            thousandSeparator=","
            decimalScale={2}
            prefix={getCurrencySimbol(clientPriceList?.priceList?.currencyId)}
            id="total"
          />

          <div className="flex-1"></div>
        </div>
        <div className="flex flex-col px-4">
          <button
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md text-lg"
            onClick={(e) => {
              productSum > 0 && deleteProduct(product.id);
              setProductSum(0);
            }}
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
