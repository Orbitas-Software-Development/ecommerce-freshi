import { React, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
import "react-toastify/dist/ReactToastify.css";
import SimpleModal from "../../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../../utils/http/functions";
export default function AddClient() {
  //local
  const [client, setClient] = useState({});
  const [persons, setPersons] = useState([]);
  const [clientPriceList, setClientPriceList] = useState([]);
  const [priceList, setPriceList] = useState([]);
  //localhost
  const user = getUserInfo();
  //modal
  const [modalData, setModalData] = useState(false);
  //route
  //Route
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  async function handleData(e) {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  }
  //ok response

  async function handleSubmit(e) {
    e.preventDefault();
    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });
    client?.id
      ? axios
          .put(`${process.env.REACT_APP_PROD}/api/client/updateClient`, {
            ...client,
            ["companyId"]: user.companyId,
          })
          .then(async (res) => {
            okResponseModalHandle({
              setModalData,
              route: "/clientdashboard",
              navigate: navigate,
            });
          })
          .catch((e) => {
            errorResponseModalHandle({
              setModalData,
              route: "/clientdashboard",
              navigate: navigate,
            });
          })
      : axios
          .post(`${process.env.REACT_APP_PROD}/createClient`, {
            ...client,
            ["companyId"]: user.companyId,
          })
          .then(async (res) => {
            okResponseModalHandle({
              setModalData,
              route: "/clientdashboard",
              navigate: navigate,
            });
          })
          .catch((e) => {
            errorResponseModalHandle({
              setModalData,
              route: "/clientdashboard",
              navigate: navigate,
            });
          });
  }

  useEffect(() => {
    data && setClient(data);
    setModalData({
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    axios
      .get(`${process.env.REACT_APP_PROD}/api/cuentas/getPersons`)
      .then((res) => {
        setPersons(res.data);
        axios
          .get(
            `${process.env.REACT_APP_PROD}/api/ClientPriceList/getClientPriceListByClientId/${data.id}`
          )
          .then((res) => {
            setClientPriceList(res.data);
            axios
              .get(
                `${process.env.REACT_APP_PROD}/getListPriceByCompanyId/${user.company.id}`
              )
              .then((res) => {
                setPriceList(res.data);
                setModalData({
                  loading: false,
                });
              });
          });
      })
      .catch((e) => {
        console.log(e);
        errorResponseModalHandle({
          route: "/clientdashboard",
          navigate: navigate,
          setModalData,
        });
      });
  }, []);

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start">
        <button
          type="submit"
          className="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/clientdashboard");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Creación de cliente
          </h1>
        </div>
        <form
          className="w-1/3 mx-auto mt-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <select
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="priceListId"
              onChange={(e) => {
                e.target.value !== "" && handleData(e);
              }}
            >
              <option value="">Seleccione Lista de precios</option>
              {priceList.map((value, index) =>
                value.id === clientPriceList?.priceListId ? (
                  <option key={index} value={value.id} selected>
                    {value.name}
                  </option>
                ) : (
                  <option key={index} value={value.id}>
                    {value.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="mb-5">
            <label
              for="name"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Razón Social
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite nombre"
              required
              name="name"
              minLength={4}
              onChange={(e) => handleData(e)}
              autoComplete="off"
              value={client?.name || ""}
            />
          </div>{" "}
          <div class="mb-5">
            <label
              for="person"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Tipo identificación
            </label>
            <select
              id="person"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="personId"
              onChange={(e) => {
                e.target.value !== "" && handleData(e);
              }}
            >
              <option value="">Tipo identificación</option>
              {persons.map((value, index) =>
                value.id === client?.personId ? (
                  <option key={index} value={value.id} selected>
                    {value.name === "legal" ? "Juídica" : "Física"}
                  </option>
                ) : (
                  <option key={index} value={value.id}>
                    {value.name === "legal" ? "Jurídica" : "Física"}
                  </option>
                )
              )}
            </select>
          </div>
          <div class="mb-5">
            <label
              for="Identifier"
              className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Cédula Jurídica
            </label>
            <input
              type="number"
              id="Identifier"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="identifier"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite identificación"
              min={10000000}
              autoComplete="off"
              value={client?.identifier || ""}
            />
          </div>
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="email"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite correo electrónico"
              minLength={4}
              autoComplete="off"
              value={client?.email || ""}
            />
          </div>{" "}
          <div className="mb-5">
            <label
              for="direction"
              className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direction"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="direction"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite dirección"
              autoComplete="off"
              value={client?.direction || ""}
            />
          </div>{" "}
          <div className="mb-5">
            <label
              for="phone"
              className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Teléfono
            </label>
            <input
              type="text"
              minLength={7}
              id="phone"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="phone"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite teléfono"
              autoComplete="off"
              value={client?.phone || ""}
            />
          </div>
          <button
            type="submit"
            className="text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Guardar
          </button>
        </form>
      </div>
    </Layout>
  );
}
