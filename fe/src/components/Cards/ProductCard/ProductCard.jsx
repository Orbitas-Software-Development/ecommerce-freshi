import { React, useEffect, useState } from "react";
import productStore from "../../../stores/productStore";
import { getCurrencySimbol } from "../../../utils/Currency/currencyFunctions";
import { NumericFormat } from "react-number-format";

export default function ProductCard({ product }) {
  //global
  const deleteProduct = productStore((state) => state.deleteProduct);
  const addedProducts = productStore((state) => state.addedProducts);
  const productsList = productStore((state) => state.products);
  //local
  const [productSum, setProductSum] = useState(0);

  const addProduct = (product) => {
    var productExisted = false;
    if (productsList.length === 0) {
      return addedProducts(product);
    }
    productsList.map((productListed) => {
      if (productListed.id === product.id) {
        deleteProduct(productListed.id);
        addedProducts(product);
        productExisted = true;
      }
    });

    if (!productExisted) {
      addedProducts(product);
    }
  };
  useEffect(() => {}, [productSum]);

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
          Unidades por caja:{" "}
          <span className="font-medium text-xl  ml-1">
            {product.unitsPerBox}
          </span>
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
            prefix={getCurrencySimbol(product.currencyId)}
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
              productSum > 1 && setProductSum(productSum - 1);
            }}
          >
            <i class="fa-solid fa-minus"></i>
          </button>
          <input
            type="text"
            value={productSum}
            className="w-[180px] text-center bg-slate-200 rounded-md text-xl font-semibold flex-1 mx-1"
            onChange={(e) => {
              e.target.value > 0 && setProductSum(parseInt(e.target.value));
            }}
          />
          <button
            className=" bg-blue-300 hover:bg-blue-400 rounded-md  py-1 px-2 text-xl flex-1"
            type="button"
            onClick={(e) => {
              setProductSum(productSum + 1);
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
            value={product.price * product.unitsPerBox * productSum}
            thousandSeparator=","
            decimalScale={2}
            prefix={getCurrencySimbol(product.currencyId)}
            id="total"
          />

          <div className="flex-1"></div>
        </div>
        <div className="flex flex-col px-4">
          <button
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md mb-2 text-lg"
            onClick={(e) => {
              productSum > 0 &&
                addProduct({ ...product, ["quantity"]: productSum });
            }}
          >
            Agregar
          </button>
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
