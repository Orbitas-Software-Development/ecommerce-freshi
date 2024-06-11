import { React, useState, useEffect } from "react";
import Layout from "../..//components/Layout/Layout";

import ProductCard from "../../components/Cards/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import productStore from "../../stores/productStore";
import clientPriceListStore from "../../stores/clientPriceList";
import { getUserInfo } from "../../utils/localStorage/functions";
import { getCurrencySimbol } from "../../utils/Currency/currencyFunctions";
import { NumericFormat } from "react-number-format";
import SimpleModal from "../../components/Modals/SimpleModal";
export default function Home() {
  //local
  const [products, setProducts] = useState([]);

  const [modalData, setModalData] = useState(false);
  //localStorate
  const userInfo = getUserInfo();
  //global
  const productsList = productStore((state) => state.products);
  const cancelProducts = productStore((state) => state.cancelProducts);
  const clientPriceList = clientPriceListStore(
    (state) => state.clientPriceList
  );
  const setClientPriceList = clientPriceListStore(
    (state) => state.setClientPriceList
  );
  //Router
  let navigate = useNavigate();
  //ProductDTO
  const productDTOlist = (branchProductList) => {
    try {
      let productList = branchProductList.map((value, index) => {
        value.product.price = value.price;
        value.product.iva = value.product.iva.porcentage;
        return value.product;
      });
      setProducts(productList);
    } catch (e) {
      console.log(e);
    }
  };
  const getUnitsNumber = () => {
    let numbers = 0;
    productsList.map((product) => {
      numbers = numbers + product.unitsPerBox * product.quantity;
    });
    return numbers;
  };

  const getBoxesNumber = () => {
    let numbers = 0;
    productsList.map((product) => {
      numbers = numbers + product.quantity;
    });
    return numbers;
  };

  const getTotalPrizeNumber = () => {
    let totalPrize = 0;
    productsList.map((product) => {
      totalPrize =
        totalPrize + product.price * product.unitsPerBox * product.quantity;
    });
    return totalPrize;
  };

  useEffect(() => {
    setModalData({
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    axios
      .get(
        `${process.env.REACT_APP_DEV}/api/PricelistProduct/geProductListByClientId/${userInfo.branch.clientId}`
      )
      .then((res) => {
        productDTOlist(res.data);
        axios
          .get(
            `${process.env.REACT_APP_DEV}/api/ClientPriceList/getClientPriceListByClientId/${userInfo.branch.clientId}`
          )
          .then((res) => {
            setClientPriceList(res.data);
            setModalData({ loading: false });
          });
      })
      .catch((e) => {
        setModalData({ loading: false });
      });
  }, []);

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-[85vw] ">
        <h2 className="text-center text-4xl mt-6">{userInfo?.branch?.name}</h2>
        <div className="flex justify-center items-center py-11 ">
          <input
            type="text"
            className="py-5 px-3 rounded-md h-10 bg-slate-200 w-96 min-w-24"
            placeholder="buscar producto"
          />
        </div>
        <p className="ml-5  text-xl">
          Productos:
          <span className="font-medium text-xl"> {products.length}</span>
        </p>
        <>
          <div className="flex flex-wrap  ">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <ProductCard product={product} />
                ))}
              </>
            ) : (
              <div className="text-center w-full">
                <p className="text-xl font-semibold">
                  No hay productos asignados a está sucursal
                </p>
              </div>
            )}
          </div>
        </>
      </div>
      <div className="w-[15vw] border flex flex-col">
        <>
          {productsList.length > 0 ? (
            <>
              <div className="border-b flex p-2">
                <p className="ml-2 text-xl">Productos:</p>
                <div>
                  <div className="ml-2 bg-gray-300 rounded-full px-2  font-bold text-xl">
                    {productsList.length}
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
                    prefix={getCurrencySimbol(
                      clientPriceList?.priceList.currencyId
                    )}
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
                      Ver carrito{" "}
                      <i class="fa-solid fa-cart-shopping text-lg"></i>
                    </button>

                    <button
                      className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md mb-4 mx-6 text-lg"
                      onClick={() => {
                        navigate("/order");
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
                0 <i class="fa-solid fa-cart-shopping text-lg"></i>
              </p>

              <div className="flex flex-col">
                <button
                  className="bg-gray-300  text-gray-500 font-bold py-2 px-4 rounded-md mb-2 mx-2 text-lg"
                  type="button"
                >
                  Ver carrito
                </button>
                <button
                  className="bg-gray-300  text-gray-500  font-bold py-2 px-4 rounded-md  mx-2 text-lg"
                  disabled
                >
                  Confirmar pedido <i class="fa-solid fa-check text-lg"></i>
                </button>
                <div className="border flex flex-col mt-4">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md my-2 mx-2 text-lg"
                    onClick={() => {
                      navigate("/myorders");
                    }}
                  >
                    Mis ordenes <i class="fa-solid fa-file-invoice text-lg"></i>
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </Layout>
  );
}
