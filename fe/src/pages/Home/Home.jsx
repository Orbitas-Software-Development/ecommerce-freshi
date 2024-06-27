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
        `${process.env.REACT_APP_PROD}/api/PricelistProduct/getProductListByClientId/${userInfo.branch.clientId}`
      )
      .then((res) => {
        productDTOlist(res.data);
        axios
          .get(
            `${process.env.REACT_APP_PROD}/api/ClientPriceList/getClientPriceListByClientId/${userInfo.branch.clientId}`
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
      <div className="flex pc:flex-row movil:flex-col w-full">
        <div className="pc:w-[85vw] movil:w-[100vw]">
          <h2 className="text-center pc:text-4xl movil:text-xl mt-6">
            {userInfo?.branch?.name}
          </h2>
          <div className="flex justify-center items-center py-5 ">
            <input
              type="text"
              className="py-5 px-3 rounded-md h-10 bg-slate-200 w-96 min-w-24"
              placeholder="buscar producto"
            />
          </div>
          <p className="ml-5  pc:text-xl">
            Productos:
            <span className="font-medium text-xl"> {products.length}</span>
          </p>
          <>
            <div className="flex flex-wrap justify-center ">
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
        <div
          className={`pc:w-[15vw] movil:w-full pc:border movil:border-t-2 movil:rounded-tl-xl movil:rounded-tr-xl pc:bg-white pc:bg-gradient-to-r  pc:from-gray-50 pc:via-gray-50  pc:to-gray-50   movil:bg-gradient-to-r  movil:from-gray-100 movil:via-gray-300 movil:to-gray-400 flex pc:flex-col movil:flex-row pc:relative ${
            productsList.length > 0 ? "movil:sticky" : "movil:fixed"
          } movil:bottom-0`}
        >
          <>
            {productsList.length > 0 ? (
              <>
                <div className="flex pc:flex-col movil:flex-col w-full">
                  <div className="flex pc:flex-col movil:flex-row movil:justify-between w-full px-4">
                    <div className="pc:border-b flex p-2">
                      <div>
                        <p className=" pc:text-xl">Productos:</p>
                      </div>
                      <div>
                        <div className="ml-2 bg-gray-300 rounded-full px-2  font-bold pc:text-xl">
                          {productsList.length}
                        </div>
                      </div>
                    </div>
                    <div className="pc:border-b flex p-2 ">
                      <div>
                        <p className="ml-2 pc:text-xl ">Cajas: </p>
                      </div>
                      <div className="ml-2">
                        <p className="pc:text-xl font-medium">
                          {getBoxesNumber()}
                        </p>
                      </div>
                    </div>
                    <div className="pc:border-b flex p-2 ">
                      <div>
                        <p className="ml-2 pc:text-xl ">Unidades: </p>
                      </div>
                      <div className="ml-2">
                        <p className="pc:text-xl font-medium">
                          {getUnitsNumber()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pc:border-b flex p-2 justify-center items-center  px-6">
                    <p className="pc:text-xl ">Precio Total: </p>
                    <NumericFormat
                      className="text-start pc:w-[100%] movil:w-auto font-semibold  rounded-md px-2 bg-white flex-1 pc:text-xl "
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
                  <div className="pc:border-b flex flex-col">
                    <div>
                      <div className="flex flex-col">
                        <button
                          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md movil:my-1 pc:my-2 mx-6 pc:text-xl"
                          type="button"
                          onClick={() => {
                            navigate("/cart");
                          }}
                        >
                          Ver carrito{" "}
                          <i class="fa-solid fa-cart-shopping pc:text-xl"></i>
                        </button>

                        <button
                          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md movil:my-1 pc:my-2 mx-6 pc:text-xl"
                          onClick={() => {
                            navigate("/order");
                          }}
                        >
                          Confirmar pedido{" "}
                          <i className="fa-solid fa-check pc:text-xl"></i>
                        </button>

                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md movil:my-1 pc:my-2 mx-6 pc:text-xl border border-black"
                          onClick={(e) => {
                            cancelProducts();
                            window.location.reload();
                          }}
                        >
                          Cancelar pedido{" "}
                          <i className="fa-solid fa-xmark pc:text-xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col movil:mt-0 pc:mt-2">
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md movil:my-1 pc:my-2 mx-6 pc:text-xl border border-black"
                      onClick={() => {
                        navigate("/myorders");
                      }}
                    >
                      Mis ordenes
                      <i className="fa-solid fa-file-invoice  pc:text-xl ml-2"></i>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex">
                  <p className="text-center font-semibold  pc:text-xl">
                    Agregue productos al carrito
                  </p>
                  <p className="text-center font-semibold  pc:text-xl">
                    0 <i className="fa-solid fa-cart-shopping  pc:text-xl"></i>
                  </p>
                  <div className="flex flex-col">
                    <button
                      className="bg-gray-300  text-gray-500 font-bold py-2 px-4 rounded-md movil:mb-1 pc:mb-2 mx-2  pc:text-xl"
                      type="button"
                    >
                      Ver carrito
                    </button>
                    <button
                      className="bg-gray-300  text-gray-500  font-bold py-2 px-4 rounded-md  mx-2  pc:text-xl"
                      disabled
                    >
                      Confirmar pedido{" "}
                      <i className="fa-solid fa-check  pc:text-xl"></i>
                    </button>
                    <div className="border flex flex-col mt-4">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md movil:my-1 pc:my-2 mx-2  pc:text-xl"
                        onClick={() => {
                          navigate("/myorders");
                        }}
                      >
                        Mis ordenes{" "}
                        <i className="fa-solid fa-file-invoice pc:text-xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </Layout>
  );
}
