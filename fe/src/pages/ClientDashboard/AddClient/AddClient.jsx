import { React, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddClient() {
  var delayInMilliseconds = 1500; //1 second

  const user = getUserInfo();
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const navigate = new useNavigate();
  async function handleData(e) {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    createClient();
  }
  const createClient = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_PRO}/createClient`, {
        ...client,
        ["companyId"]: getUserInfo().companyId,
      })
      .then((res) => {
        toast(
          <>
            <i class="fa-solid fa-circle-check"></i> Guardado correctamente
          </>
        );
        setLoading(false);
        setTimeout(function () {
          navigate("/clientdashboard");
        }, delayInMilliseconds);
      })
      .catch((e) => {
        toast("No se ha creado");
        setLoading(false);
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PRO}/api/cuentas/getPersons`)
      .then((res) => {
        setPersons(res.data);
      });
  }, []);

  return (
    <Layout>
      <div className="w-full flex flex-col justify-start items-start">
        <ToastContainer position="bottom-center" />
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
          className="w-96 mx-auto mt-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
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
              onChange={(e) => handleData(e)}
            />
          </div>
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
              value.id == person.id ? (
                <option key={index} value={value.id} selected>
                  {value.name.upperCase()}
                </option>
              ) : (
                <option key={index} value={value.id}>
                  {value.name.toUpperCase()}
                </option>
              )
            )}
          </select>
          <div class="mb-5">
            <label
              for="Identifier"
              className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Cédula Jurídica
            </label>
            <input
              type="text"
              id="Identifier"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="identifier"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite identificación"
              min={6}
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
              type="direction"
              id="direction"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="direction"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite dirección"
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
              type="phone"
              id="phone"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="phone"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite teléfono"
            />
          </div>
          <button
            type="submit"
            className="text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? (
              <i className="fa-solid fa-hourglass-half fa-bounce"></i>
            ) : (
              "Guardar"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
}
