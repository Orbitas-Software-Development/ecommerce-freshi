import { React, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUserInfo } from "../../utils/localStorage/functions";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
export default function UpdatePassword() {
  const [password, setPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    updatePasword();
  }
  async function handleData(e) {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  }

  const updatePasword = () => {
    setLoading(true);
    axios
      .post(`https://localhost:7065/updateuser`, {
        ...password,
        ["id"]: getUserInfo().id,
      })
      .then((res) => {
        toast("Clave actualizada");
        setLoading(false);
        navigate("/login");
      })
      .catch((e) => {
        toast("No se ha actualizado");
        setLoading(false);
      });
  };
  const navigate = new useNavigate();
  return (
    <Layout>
      <div className="w-full flex flex-col justify-start items-start">
        <ToastContainer position="bottom-center" />{" "}
        <button
          type="submit"
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/login");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Actualización de Contraseña
          </h1>
        </div>
        <form
          class="w-96 mx-auto mt-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <label
            for="password"
            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Nueva contraseña
          </label>
          <input
            type="password"
            id="password"
            class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Dígite su clave"
            required
            name="password"
            onChange={(e) => handleData(e)}
            minLength={6}
          />
          <button
            type="submit"
            class="text-white mt-4 text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
