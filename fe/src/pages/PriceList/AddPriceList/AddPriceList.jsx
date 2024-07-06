import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
import SimpleModal from "../../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../../utils/http/functions";

export default function AddPriceList() {
  const [listInDolar, setListInDolar] = useState(false);
  //modal
  const [modalData, setModalData] = useState(false);
  //local
  const [priceList, setPriceList] = useState([]);
  //localStorage
  const user = getUserInfo();
  //Route
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  async function handleData(e) {
    if (!priceList?.currencyId) priceList.currencyId = 1; // si no se ha sellecionado la moneda
    setPriceList({
      ...priceList,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });

    priceList.companyId = user.companyId;
    priceList?.id
      ? axios
          .put(
            `${process.env.REACT_APP_PROD}/api/priceList/updatePriceList`,
            priceList
          )
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/priceList",
              navigate: navigate,
            });
          })
          .catch((e) => {
            console.log(e);
            errorResponseModalHandle({
              setModalData,
              route: "/priceList",
              navigate: navigate,
            });
          })
      : axios
          .post(
            `${process.env.REACT_APP_PROD}/api/priceList/createPriceList`,
            priceList
          )
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/assignProduct",
              navigate: navigate,
              routeState: {
                state: res.data,
              },
            });
          })
          .catch((e) => {
            console.log(e);
            errorResponseModalHandle({
              setModalData,
              route: "/priceList",
              navigate: navigate,
            });
          });
  }

  useEffect(() => {
    data && setPriceList(data);
  }, []);
  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start">
        <button
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/priceList");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Agregar lista de precio
          </h1>
        </div>
        <form
          class="w-96 mx-auto mt-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <label class="inline-flex items-center cursor-pointer ">
            {priceList?.currencyId ? (
              <input
                type="checkbox"
                class="sr-only peer ml-1"
                checked={priceList?.currencyId === 2 ? true : false}
                onChange={(e) => {
                  console.log(priceList);
                  setPriceList({
                    ...priceList,
                    ["currencyId"]: priceList?.currencyId === 1 ? 2 : 1,
                  });
                }}
              />
            ) : (
              <input
                type="checkbox"
                class="sr-only peer ml-1"
                onChange={(e) => {
                  setPriceList({
                    ...priceList,
                    ["currencyId"]: priceList?.currencyId ? 1 : 2,
                  });
                }}
              />
            )}

            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300">
              Lista en Dólares
            </span>
          </label>
          <div class="mb-5">
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite nombre"
              required
              name="name"
              onChange={(e) => handleData(e)}
              value={priceList?.name || ""}
            />{" "}
            <label
              for="description"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Descripción
            </label>
            <input
              type="text"
              id="description"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite nombre"
              required
              name="description"
              onChange={(e) => handleData(e)}
              value={priceList?.description || ""}
            />
          </div>
          <button
            type="submit"
            class="text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Guardar
          </button>
        </form>
      </div>
    </Layout>
  );
}
