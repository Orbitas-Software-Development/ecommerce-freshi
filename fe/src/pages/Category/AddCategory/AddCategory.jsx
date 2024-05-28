import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
import MicroModal from "react-micro-modal";
export default function AddCategory() {
  //local
  const [category, setCategory] = useState([]);
  const [action, setAction] = useState([]);
  //localStorage

  const user = getUserInfo();
  //Route
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  async function handleData(e) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    setAction(true);
    e.preventDefault();

    category.companyId = user.companyId;

    category?.id
      ? axios
          .put(
            `${process.env.REACT_APP_DEV}/api/category/updateCategory`,
            category
          )
          .then((res) => {
            navigate("/category");
            setAction(false);
          })
      : axios
          .post(
            `${process.env.REACT_APP_DEV}/api/category/createCategory`,
            category
          )
          .then((res) => {
            navigate("/category");
            setAction(false);
          });
  }
  useEffect(() => {
    data && setCategory(data);
  }, []);
  return (
    <Layout>
      <MicroModal
        openInitially={false}
        open={action}
        trigger={(open) => <div onClick={open}></div>}
      >
        {(close) => (
          <button onClick={close}>
            <p className="text-xl">
              Cargando <i class="fa-solid fa-circle-notch fa-spin fa-lg"></i>{" "}
            </p>
          </button>
        )}
      </MicroModal>{" "}
      <div className="w-full flex flex-col justify-start items-start">
        <button
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/category");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Categorias
          </h1>
        </div>{" "}
        <form
          class="w-96 mx-auto mt-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
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
              class="mb-4 bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite nombre"
              required
              name="name"
              onChange={(e) => handleData(e)}
              value={category?.name || ""}
            />
            <button
              type="submit"
              class="text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
