import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
import categoryStore from "../../../stores/categoryStore";
import { validateExistedValue } from "../../../utils/utils";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../../utils/http/functions";
import SimpleModal from "../../../components/Modals/SimpleModal";
export default function AddCategory() {
  //global
  const categories = categoryStore((state) => state.categories);
  //local
  const [category, setCategory] = useState([]);
  //localStorage
  const user = getUserInfo();
  //Route
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  //modal
  const [modalData, setModalData] = useState(false);
  async function handleData(e) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !category?.id &&
      validateExistedValue(categories, category.name, "name")
    ) {
      return errorResponseModalHandle({
        loading: true,
        message: <>{`La categoria: ${category.name}, ya existe`}</>,
        modalIcon: "info",
        setModalData: setModalData,
      });
    }
    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });

    category.companyId = user.companyId;
    category?.id
      ? axios
          .put(
            `${process.env.REACT_APP_PROD}/api/category/updateCategory`,
            category
          )
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/category",
              navigate: navigate,
            });
          })
      : axios
          .post(
            `${process.env.REACT_APP_PROD}/api/category/createCategory`,
            category
          )
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/category",
              navigate: navigate,
            });
          });
  }
  useEffect(() => {
    data && setCategory(data);
  }, []);
  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start">
        <button
          class="text-white min-w-[200px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center "
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
          class="w-96 mx-auto mt-4 border rounded-md p-8 pc:w-[50%] movil:w-[100%]"
          onSubmit={handleSubmit}
        >
          <div class="mb-5">
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900 "
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              class="mb-4 bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite nombre"
              required
              name="name"
              onChange={(e) => handleData(e)}
              value={category?.name || ""}
              autocomplete="off"
            />{" "}
            <div className="text-center">
              <button
                type="submit"
                class="min-w-[200px] text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center "
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
