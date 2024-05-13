import { React, useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBranch() {
  const user = getUserInfo();
  //local
  const [branch, setBranch] = useState({});
  const [clients, setClients] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = new useNavigate();
  async function handleData(e) {
    setBranch({
      ...branch,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    createBranch();
  }
  const createBranch = () => {
    setLoading(true);
    console.log(branch);
    axios
      .post(`https://localhost:7065/createBranch`, branch)
      .then((res) => {
        toast(
          <>
            <i class="fa-solid fa-hourglass-half fa-bounce"></i>Guardado
            correctamente
          </>
        );
        setTimeout(function () {
          navigate("/branchdashboard");
        }, 1500);
        setLoading(false);
        navigate("/branchdashboard");
      })
      .catch((e) => {
        toast("No se ha creado");
        setLoading(false);
      });
  };
  useEffect(() => {
    axios
      .get(`https://localhost:7065/getClientByCompanyId/${user.id}`)
      .then((res) => {
        setClients(res.data);
        axios
          .get(
            `https://localhost:7065/getListPriceByCompanyId/${user.company.id}`
          )
          .then((res) => {
            setPriceList(res.data);
          });
      });
  }, []);

  return (
    <Layout>
      <div className="w-full flex flex-col justify-start items-start">
        <ToastContainer position="bottom-center" />
        <button
          type="submit"
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/branchdashboard");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Creación de Sucursal
          </h1>
        </div>
        <form
          class="w-[50%] mx-auto mt-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <div class="mb-5">
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Cliente
            </label>
            <select
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="clientId"
              onChange={(e) => {
                e.target.value !== "" && handleData(e);
              }}
            >
              <option value="">Seleccione Cliente</option>
              {clients.map((value, index) => (
                <option key={index} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
            <label
              for="priceListId"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Lista de precios
            </label>{" "}
            <select
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="priceListId"
              onChange={(e) => {
                e.target.value !== "" && handleData(e);
              }}
            >
              <option value="">Seleccione Lista de precios</option>
              {priceList.map((value, index) => (
                <option key={index} value={value.priceListId}>
                  {value.name}
                </option>
              ))}
            </select>
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Nombre de Sucursal
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite nombre"
              required
              name="name"
              onChange={(e) => handleData(e)}
            />
          </div>
          <div class="mb-5">
            <label
              for="phoneNumber"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Télefono
            </label>
            <input
              type="text"
              id="phoneNumber"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="phoneNumber"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite Teléfono"
            />
            <label
              for="direction"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direction"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="direction"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite Dirección"
            />
            <label
              for="latitude"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Latitud
            </label>
            <input
              type="text"
              id="latitude"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="latitude"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite Latitud"
            />
            <label
              for="longitud"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Longitud
            </label>
            <input
              type="text"
              id="longitude"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="longitude"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite longitude"
            />
          </div>

          <button
            type="submit"
            class="text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? (
              <i class="fa-solid fa-hourglass-half fa-bounce"></i>
            ) : (
              "Guardar"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
}
