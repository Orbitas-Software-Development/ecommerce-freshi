import { React, useState, useEffect } from "react";
import axios from "axios";
import { getUserInfo } from "../../utils/localStorage/functions";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Tables/Table/Table";
import { useNavigate } from "react-router-dom";
import EmptyResponse from "../../components/EmptyResponse/EmptyResponse";
import SimpleModal from "../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../utils/http/functions";
import categoryStore from "../../stores/categoryStore";
export default function Category() {
  //global
  const categories = categoryStore((state) => state.categories);
  const setCategories = categoryStore((state) => state.setCategories);
  //local
  const [category, setCategory] = useState([]);
  //localStorage
  const user = getUserInfo();
  //Route
  const navigate = useNavigate();
  //modal
  const [modalData, setModalData] = useState(false);
  useEffect(() => {
    setModalData({
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    axios
      .get(
        `${process.env.REACT_APP_PROD}/api/category/getCategoryByCompany/${user.company.id}`
      )
      .then((res) => {
        // setCategory(res.data);
        setCategories(res.data);
        setModalData({
          loading: false,
        });
      })
      .catch((res) => {
        errorResponseModalHandle({
          message: "Error al cargar los datos",
          route: "/admindashboard",
          setModalData,
          navigate,
        });
      });
  }, []);
  let deleteCategory = async (categoryId) => {
    setModalData({
      loading: true,
      text: <>Eliminando</>,
      icon: "loading",
    });
    let res = await axios.get(
      `${process.env.REACT_APP_PROD}/api/product/getProductByCategoryId/${categoryId}`
    );
    if (res.data > 0)
      return errorResponseModalHandle({
        message: "No se puede borrar, tiene varios productos asociados",
        setModalData,
        modalIcon: "info",
      });
    axios
      .delete(
        `${process.env.REACT_APP_PROD}/api/category/deleteCategory/${categoryId}`
      )
      .then((res) => {
        setCategories(res.data);
        okResponseModalHandle({
          setModalData,
          time: 1000,
          message: "Eliminado",
        });
      })
      .cacth((err) => {
        errorResponseModalHandle({
          message: "Error al eliminar",
          setModalData,
        });
      });
  };

  const columns = [
    {
      name: "#",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row, index) => index + 1,
    },
    {
      name: "Nombre",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.name,
    },

    {
      name: "Acción",
      center: true,
      cell: (row) => (
        <button
          className="min-w-[100px] py-2 px-4 m-2  bg-blue-500 hover:bg-blue-600 text-white font-bol rounded-md  text-lg"
          type="button"
          onClick={(e) => navigate("/categoryForm", { state: row })}
        >
          Editar
        </button>
      ),
    },
    {
      name: "Acción",
      center: true,
      cell: (row) => (
        <button
          className=" min-w-[100px] py-2 px-4 m-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md  text-lg"
          type="button"
          onClick={(e) => deleteCategory(row.id)}
        >
          Eliminar
        </button>
      ),
    },
  ];
  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start p-5">
        <button
          type="submit"
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/admindashboard");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Categorias
          </h1>
        </div>
        {categories.length > 0 ? (
          <>
            <div>
              <button
                className="text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6  text-lg"
                type="button"
                onClick={(e) => {
                  navigate("/categoryform");
                }}
              >
                Agregar Categoria <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="border rounded-md w-full p-2">
              <Table columns={columns} data={categories} />
            </div>
          </>
        ) : (
          <EmptyResponse
            message={"No hay listas de precios registrados"}
            redirectRoute={"categoryForm"}
            addMessage={"Agregar Categoria"}
          />
        )}
      </div>
    </Layout>
  );
}
