import { React, useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo } from "../../../utils/localStorage/functions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AddUser() {
  const [branches, setBranches] = useState([]);
  const [client, setClient] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = new useNavigate();
  async function handleData(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    createBranch();
  }
  const createBranch = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_DEV}/register`, {
        ...user,
        ["password"]: user.userName,
      })
      .then((res) => {
        toast("Guardado correctamente");
        setLoading(false);
        navigate("/admindashboard");
      })
      .catch((e) => {
        console.log(e);
        toast(e.response.data.message[0].description);
        setLoading(false);
      });
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_DEV}/getBranchByClient/${
          getUserInfo().companyId
        }`
      )
      .then((res) => {
        setBranches(res.data);
        axios
          .get(
            `${process.env.REACT_APP_DEV}/getClientByCompanyId/${
              getUserInfo().companyId
            }`
          )
          .then((res) => {
            setClient(res.data);
          })
          .catch((e) => {
            toast("Error al comunicarse con el servidor");
          });
      });
  }, []);

  return (
    <Layout>
      <div className="w-full flex flex-col justify-start items-start">
        <button
          type="submit"
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/admindashboard");
          }}
        >
          Atras
        </button>{" "}
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Registro de usuarios
          </h1>
        </div>
        <ToastContainer position="bottom-center" />{" "}
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="clientId"
              onChange={(e) => {
                handleData(e);
              }}
              required
            >
              <option value="">Seleccione Cliente</option>
              {client.map((value, index) => (
                <option key={index} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Sucursal
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="branchId"
              onChange={(e) => {
                e.target.value !== "" && handleData(e);
              }}
              required
            >
              <option value="">Seleccione Sucursal</option>
              {user.clientId &&
                branches.map((value, index) => (
                  <>
                    {value.clientId === parseInt(user.clientId) ? (
                      <>
                        <option key={index} value={value.id}>
                          {value.name}
                        </option>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
            </select>
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite email"
              required
              name="email"
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <label
              for="userName"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Usuario
            </label>
            <input
              type="text"
              id="userName"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite usuario"
              required
              name="userName"
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />{" "}
            <label
              for="fullName"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite nombre completo"
              required
              name="fullName"
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <label
              for="personalIdentification"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Identificación
            </label>
            <input
              type="text"
              id="personalIdentification"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite identificación"
              required
              name="personalIdentification"
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <label
              for="jobtTitle"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Puesto
            </label>
            <input
              type="text"
              id="jobtTitle"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite nombre"
              required
              name="jobtTitle"
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <label
              for="direction"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direction"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite puesto"
              required
              name="direction"
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <button
              type="submit"
              class="text-white  text-lg mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? (
                <i class="fa-solid fa-hourglass-half fa-bounce"></i>
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
