import { React, useState, useEffect } from "react";
import axios from "axios";
import { getUserInfo } from "../../utils/localStorage/functions";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import productStore from "../../stores/productStore";
import EmptyResponse from "../../components/EmptyResponse/EmptyResponse";
import Table from "../../components/Tables/Table/Table";
import SimpleModal from "../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../utils/http/functions";
export default function Products() {
  //global
  const products = productStore((state) => state.products);
  const setProducts = productStore((state) => state.setProducts);

  //localSotrage
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
        `${process.env.REACT_APP_PROD}/api/product/getProductsByCompanyId/${user.companyId}`
      )
      .then((res) => {
        setProducts(res.data);
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
  const deleteProductId = async (productId) => {
    setModalData({
      loading: true,
      text: <>Eliminando</>,
      icon: "loading",
    });
    let res = await axios.get(
      `${process.env.REACT_APP_PROD}/api/PricelistProduct/getPriceListProductByProductId/${productId}`
    );
    if (res.data.length > 0)
      return errorResponseModalHandle({
        message: "No se puede borrar, se encuentra en una o varias listas",
        setModalData,
        modalIcon: "info",
      });
    await axios
      .delete(
        `${process.env.REACT_APP_PROD}/api/product/deleteProductBy/${productId}`
      )
      .then((res) => {
        setProducts(res.data);
        okResponseModalHandle({
          setModalData,
          time: 1000,
          message: "Eliminado",
        });
      })
      .catch((err) => {
        errorResponseModalHandle({
          message: "Error al eliminar",
          route: "/admindashboard",
          navigate: navigate,
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
      name: "Descripción",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.description,
    },
    {
      name: "Código",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.code,
    },

    {
      name: "Unidades por caja",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.unitsPerBox,
    },
    {
      name: "Peso",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.unitWeight,
    },
    {
      name: "Categoría",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.category.name,
    },
    {
      name: "IVA",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.iva.name,
    },
    {
      name: "Moneda",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.currency.name,
    },
    {
      name: "Editar",
      center: true,
      cell: (product) => (
        <button
          className="min-w-[100px] py-2 px-4 m-2  bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded-md text-lg"
          type="button"
          onClick={(e) => navigate("/productform", { state: product })}
        >
          Editar
        </button>
      ),
    },
    {
      name: "Eliminar",
      center: true,
      cell: (row) => (
        <button
          className="min-w-[100px] py-2 px-4 m-2  bg-red-500 hover:bg-red-600 text-white font-bold rounded-md text-lg"
          type="button"
          onClick={(e) => deleteProductId(row.id)}
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
          <h1 className="mt-4 font-semibold text-3xl text-center">Productos</h1>
        </div>
        {products.length > 0 ? (
          <>
            <div className="">
              <button
                className="text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6  text-lg"
                type="button"
                onClick={(e) => {
                  navigate("/productform");
                }}
              >
                Agregar Producto <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="border rounded-md w-full">
              <Table columns={columns} data={products} />
            </div>
          </>
        ) : (
          <EmptyResponse
            message={"No hay productos registrados"}
            redirectRoute={"productform"}
            addMessage={"Agregar Producto"}
          />
        )}
      </div>
    </Layout>
  );
}
