import { React, useEffect, useState } from "react";
import { getCurrencySimbol } from "../../utils/Currency/currencyFunctions";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { getUserInfo } from "../../utils/localStorage/functions";
import { Link, useNavigate } from "react-router-dom";
import MicroModal from "react-micro-modal";
import Loading from "../../components/Loading/Loading";
export default function CompanyOrders() {
  //navigate
  const navigate = new useNavigate();
  const [userInfo, setUserInfo] = useState({});
  //local
  const [orders, setOrders] = useState([]);

  const boxesNumber = (products) => {
    let number = 0;
    products.map((value) => {
      number = number + value.boxes;
    });
    return number;
  };

  const unitsNumber = (products) => {
    let number = 0;
    products.map((value) => {
      number = number + value.units;
    });
    return number;
  };
  const totalNumber = (products) => {
    let number = 0;
    products.map((value) => {
      number =
        number +
        value.total * value.boxes +
        value.boxes * value.total * porcentageConverter(value.iva);
    });
    return number;
  };
  useEffect(() => {
    setUserInfo(getUserInfo());
    axios
      .get(
        `https://localhost:7065/getOrderByCompanyId/${
          JSON.parse(localStorage.getItem("user")).companyId
        }`
      )
      .then((res) => {
        setOrders(res.data);
      });
  }, []);
  var porcentageConverter = (porcentage) => {
    if (porcentage < 10) {
      return parseFloat("0.0" + porcentage.toString());
    }
    return parseFloat("0." + porcentage.toString());
  };
  return (
    <Layout>
      <div className="w-[85vw] justify-center">
        <h2 className="text-center text-4xl mt-6">{userInfo?.branch?.name}</h2>{" "}
        <h2 className="text-center text-4xl mt-6">Ordenes de pedidos</h2>{" "}
        <Link to="/admindashboard">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
            type="button"
          >
            <i class="fa-solid fa-arrow-left text-lg"></i> Inicio
          </button>
        </Link>
        <div className="w-full flex justify-center">
          <div class="relative overflow-x-auto mt-4">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    #
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Fecha
                  </th>{" "}
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Cajas Totales
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Unidades Totales
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Detalles
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Orden de compra
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  <>
                    {orders.map((order, index) => (
                      <>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {index + 1}
                          </th>
                          <td class="px-6 py-4">
                            {new Date(order.createdDate).toLocaleDateString()}
                          </td>
                          <td class="px-6 py-4">{order.status}</td>

                          <td class="px-6 py-4">
                            {boxesNumber(order.ordersDetails)}
                          </td>
                          <td class="px-6 py-4">
                            {unitsNumber(order.ordersDetails)}
                          </td>
                          <td class="px-6 py-4">
                            {getCurrencySimbol(
                              order.ordersDetails[0].product.currencyId
                            ) + totalNumber(order.ordersDetails)}
                          </td>
                          <td class="px-6 py-4">
                            <MicroModal
                              trigger={(open) => (
                                <button
                                  className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
                                  type="button"
                                  onClick={open}
                                >
                                  Ver
                                </button>
                              )}
                            >
                              {(close) => (
                                <div className="w-[400px]">
                                  <div className="text-center font-semibold">
                                    Detalles del pedido
                                    <div>
                                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                          <tr>
                                            <th scope="col" class="px-6 py-3">
                                              #
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                              Producto
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                              Cajas
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                              Unidades
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                              Precio unidad
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                              IVA
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                              Total
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {order.ordersDetails.map(
                                            (value, index) => (
                                              <tr className="border-t">
                                                <td class="px-6 py-4">
                                                  {index + 1}
                                                </td>
                                                <td class="px-6 py-4">
                                                  {value.product.description}
                                                </td>
                                                <td class="px-6 py-4">
                                                  {value.boxes}
                                                </td>
                                                <td class="px-6 py-4">
                                                  {value.units}
                                                </td>
                                                <td class="px-6 py-4">
                                                  {getCurrencySimbol(
                                                    order.ordersDetails[0]
                                                      .product.currencyId
                                                  ) + value.price}
                                                </td>
                                                <td class="px-6 py-4">
                                                  {value.iva}
                                                </td>
                                                <td class="px-6 py-4">
                                                  {getCurrencySimbol(
                                                    order.ordersDetails[0]
                                                      .product.currencyId
                                                  ) +
                                                    (value.total * value.boxes +
                                                      value.total *
                                                        value.boxes *
                                                        porcentageConverter(
                                                          value.iva
                                                        ))}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <button
                                      className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6"
                                      type="button"
                                      onClick={close}
                                    >
                                      Cerrar
                                    </button>
                                  </div>
                                </div>
                              )}
                            </MicroModal>
                          </td>
                          <td class="px-6 py-4">
                            <button
                              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
                              type="button"
                              onClick={() => {
                                navigate("/vieworder", {
                                  state: order,
                                });
                                //generatePDF(order.ordersDetails);
                              }}
                            >
                              Ver
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="text-center w-full p-4  font-bold  text-xl">
                      <div className="flex items-center justify-center w-full">
                        <div className=" flex  items-center justify-center w-full">
                          <Loading />
                          <i class="ml-1 fa-solid fa-hourglass-half fa-bounce"></i>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
