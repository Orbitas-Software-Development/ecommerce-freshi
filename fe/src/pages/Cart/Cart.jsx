import React from "react";
import Layout from "../../components/Layout/Layout";
import productStore from "../../stores/productStore";
import ProductCartConfirmation from "../../components/Cards/ProductCard/ProductCartConfirmation";
import { getCurrencySimbol } from "../../utils/Currency/currencyFunctions";
import { Link, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

export default function Cart() {
  //Route
  //Router
  const navigate = new useNavigate();
  const products = productStore((state) => state.products);

  const cancelProducts = productStore((state) => state.cancelProducts);
  const getUnitsNumber = () => {
    let numbers = 0;
    products.map((product) => {
      numbers = numbers + product.unitsPerBox * product.quantity;
    });
    return numbers;
  };

  const getBoxesNumber = () => {
    let numbers = 0;
    products.map((product) => {
      numbers = numbers + product.quantity;
    });
    return numbers;
  };

  const getTotalPrizeNumber = () => {
    let totalPrize = 0;
    console.log(products);
    products.map((product) => {
      totalPrize += product.price * product.unitsPerBox * product.quantity;
    });
    return totalPrize;
  };
  return (
    <Layout>
      <div className="w-[83vw] ">
        <h3 className="text-center mt-3 text-3xl">
          Carrito de compras <i class="fa-solid fa-cart-shopping"></i>
        </h3>

        <Link to="/home">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
            type="button"
          >
            <i class="fa-solid fa-arrow-left "></i> Inicio
          </button>
        </Link>
        <div className="flex">
          <p className="ml-5  text-lg mr-4">
            Productos:
            <span className="font-medium text-lg">{products.length}</span>
          </p>
          <button
            className="text-red-500 font-semibold bg-red-300 rounded-md p-1 text-lg"
            onClick={(e) => {
              cancelProducts();
            }}
          >
            Remover Todo
          </button>
        </div>
        <div className="flex flex-wrap  ">
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <ProductCartConfirmation product={product} />
              ))}
            </>
          ) : (
            <div className="w-[83vw] ">
              <p className="text-center text-lg">No hay órdenes</p>{" "}
              <div className="text-center">
                <button
                  className="text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6"
                  type="button"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Agregar órdenes <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-[15vw] border flex flex-col">
        <>
          {products.length > 0 ? (
            <>
              <div className="border-b flex p-2">
                <p className="ml-2 text-xl">Productos:</p>
                <div>
                  <div className="ml-2 bg-gray-300 rounded-full px-2  font-bold text-xl">
                    {products.length}
                  </div>
                </div>
              </div>
              <div className="border-b flex p-2">
                <div>
                  <p className="ml-2 text-xl ">Cajas: </p>
                </div>
                <div className="ml-2">
                  <p className="text-xl font-medium">{getBoxesNumber()}</p>
                </div>
              </div>
              <div className="border-b flex p-2">
                <div>
                  <p className="ml-2 text-xl ">Unidades: </p>
                </div>
                <div className="ml-2">
                  <p className="text-xl font-medium">{getUnitsNumber()}</p>
                </div>
              </div>
              <div className="border-b flex p-2 justify-center items-center">
                <p className="ml-2 text-xl ">Precio Total: </p>
                <div className="flex-1 ">
                  <NumericFormat
                    className="text-start w-[100%] font-semibold  rounded-md px-2 bg-white flex-1 text-xl "
                    value={getTotalPrizeNumber()}
                    thousandSeparator=","
                    decimalScale={2}
                    prefix={getCurrencySimbol(products[0].currencyId)}
                    id="total"
                    disabled
                  />
                </div>
              </div>
              <div className="border-b flex flex-col">
                <div>
                  <div className="flex flex-col">
                    <button
                      className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
                      type="button"
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      Ver carrito
                      <i class="fa-solid fa-cart-shopping text-lg"></i>
                    </button>

                    <button
                      className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md mb-4 mx-6 text-lg"
                      onClick={() => {
                        navigate("/Order");
                      }}
                    >
                      Confirmar pedido <i class="fa-solid fa-check text-lg"></i>
                    </button>

                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md mb-4 mx-6 text-lg"
                      onClick={(e) => {
                        cancelProducts();
                        window.location.reload();
                      }}
                    >
                      Cancelar pedido <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md mb-4 mx-6 text-lg"
                  onClick={() => {
                    navigate("/myorders");
                  }}
                >
                  Mis ordenes <i class="fa-solid fa-file-invoice text-lg"></i>
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-center font-semibold text-lg">
                Agregue productos al carrito
              </p>
              <p className="text-center font-semibold text-lg">
                0 <i class="fa-solid fa-cart-shopping"></i>
              </p>

              <div className="flex flex-col">
                <button
                  className="bg-gray-300  text-gray-500  font-bold py-2 px-4 rounded-md  mx-2"
                  disabled
                  onClick={() => {
                    navigate("/myorders");
                  }}
                >
                  Confirmar pedido <i class="fa-solid fa-check"></i>
                </button>
              </div>
            </>
          )}
        </>
      </div>
    </Layout>
  );
}
