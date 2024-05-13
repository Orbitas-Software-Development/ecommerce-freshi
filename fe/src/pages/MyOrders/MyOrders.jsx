import { React, useEffect, useState } from "react";
import { getCurrencySimbol } from "../../utils/Currency/currencyFunctions";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { getUserInfo } from "../../utils/localStorage/functions";
import { Link, useNavigate } from "react-router-dom";
import MicroModal from "react-micro-modal";
import Loading from "../..//components/Loading/Loading";
import Table from "../../components/Tables/Table/Table";
export default function MyOrders() {
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
    console.log(products);
    products.map((value) => {
      number =
        number +
        value.price * value.units * value.boxes +
        value.price *
          value.units *
          value.boxes *
          porcentageConverter(value.iva);
    });
    return number;
  };
  //getOrders
  useEffect(() => {
    setUserInfo(getUserInfo());
    axios
      .get(
        `https://localhost:7065/getOrderByBranchId/${
          JSON.parse(localStorage.getItem("user")).branchId
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

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
    },
    {
      name: "ID",
      cell: (row) => row.id,
    },
    {
      name: "FECHA",
      selector: (row) => new Date(row.createdDate).toLocaleDateString(),
    },
    {
      name: "ESTATUS",
      selector: (row) => row.status,
    },
    {
      name: "CAJAS TOTALES",
      selector: (row) => boxesNumber(row.ordersDetails),
    },
    {
      name: "UNIDADES TOTALES",
      selector: (row) => unitsNumber(row.ordersDetails),
    },
    {
      name: "TOTAL",
      selector: (row) =>
        getCurrencySimbol(row.ordersDetails[0].product.currencyId) +
        totalNumber(row.ordersDetails).toFixed(2),
    },
    {
      name: "DETALLES",
      cell: (row) => (
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
            <div className="w-full">
              <div className="flex justify-end items-end mt-2">
                <div className="text-center absolute">
                  <button
                    className=" hover:bg-white text-white font-bold rounded-xl  border-2 "
                    type="button"
                    onClick={close}
                  >
                    <i class="fa-solid fa-circle-xmark fa-2xl text-red-500"></i>
                  </button>
                </div>
              </div>
              <div className="text-center font-semibold text-lg">
                Detalles del pedido
                <div>
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          #
                        </th>{" "}
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
                        </th>{" "}
                        <th scope="col" class="px-6 py-3">
                          IVA
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {row.ordersDetails.map((value, index) => (
                        <tr className="border-t">
                          <td class="px-6 py-4">{index + 1}</td>
                          <td class="px-6 py-4">{value.product.description}</td>
                          <td class="px-6 py-4">{value.boxes}</td>
                          <td class="px-6 py-4">{value.units}</td>
                          <td class="px-6 py-4">
                            {getCurrencySimbol(
                              row.ordersDetails[0].product.currencyId
                            ) + value.price.toFixed(2)}
                          </td>
                          <td class="px-6 py-4">{value.iva + "%"}</td>
                          <td class="px-6 py-4">
                            {getCurrencySimbol(
                              row.ordersDetails[0].product.currencyId
                            ) +
                              (
                                value.total * value.boxes +
                                value.total *
                                  value.boxes *
                                  porcentageConverter(value.iva)
                              ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </MicroModal>
      ),
    },
    {
      name: "ÓRDEN DE COMPRA",
      cell: (row) => (
        <button
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={() => {
            navigate("/vieworder", {
              state: row,
            });
          }}
        >
          Ver
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="w-full justify-center">
        <h2 className="text-center text-4xl mt-6">{userInfo?.branch?.name}</h2>{" "}
        <h2 className="text-center text-4xl mt-6">Mis órdenes</h2>{" "}
        <Link to="/home">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
            type="button"
          >
            <i class="fa-solid fa-arrow-left text-lg"></i> Inicio
          </button>
        </Link>
        <div className="w-full flex justify-center">
          <Table columns={columns} data={orders} />
        </div>
      </div>
    </Layout>
  );
}
