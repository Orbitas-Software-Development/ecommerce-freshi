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
export default function PriceList() {
  //local
  const [priceList, setPriceList] = useState([]);
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
        `${process.env.REACT_APP_PROD}/getListPriceByCompanyId/${user.company.id}`
      )
      .then((res) => {
        setPriceList(res.data);
        setModalData({
          loading: false,
        });
      })
      .catch((res) => {
        setModalData({
          loading: false,
        });
      });
  }, []);

  const deletePriceList = async (PriceListId) => {
    setModalData({
      loading: true,
      text: <>Eliminando</>,
      icon: "loading",
    });
    let res = await axios.get(
      `${process.env.REACT_APP_PROD}/api/PricelistProduct/getPricelistProductByPriceListId/${PriceListId}`
    );
    if (res.data.length > 0)
      return errorResponseModalHandle({
        message: "No se puede borrar, Tiene varios productos asociados",
        setModalData,
        modalIcon: "info",
      });
    await axios
      .delete(
        `${process.env.REACT_APP_PROD}/api/priceList/deletePriceList/${PriceListId}`
      )
      .then((res) => {
        setPriceList(res.data);
        okResponseModalHandle({
          setModalData,
          time: 1000,
          message: "Eliminado",
        });
      })
      .catch((e) => {
        errorResponseModalHandle({
          message: "Error al eliminar",
          setModalData,
        });
      });
  };

  const columns = [
    {
      name: "Asignar Producto",
      center: true,
      cell: (priceList) => (
        <button
          className="py-2 px-4 m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded-md text-lg"
          type="button"
          onClick={(e) => navigate("/assignProduct", { state: priceList })}
        >
          <i class="fa-solid fa-square-plus"></i>
        </button>
      ),
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
      name: "Moneda",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => (row.currencyId === 1 ? "Colones" : "Dólares"),
    },
    {
      name: "Editar",
      center: true,
      cell: (priceList) => (
        <button
          className="py-2 px-4 m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded-md  text-lg"
          type="button"
          onClick={(e) => navigate("/priceListform", { state: priceList })}
        >
          <i class="fa-solid fa-pencil"></i>
        </button>
      ),
    },

    {
      name: "Eliminar",
      center: true,
      cell: (product) => (
        <button
          className="py-2 px-4 m-2 bg-red-500 hover:bg-red-600 text-white font-bold  rounded-md text-lg"
          type="button"
          onClick={() => deletePriceList(product.id)}
        >
          <i class="fa-solid fa-trash-can"></i>
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
            Lista de Precios
          </h1>
        </div>
        {priceList.length > 0 ? (
          <>
            <div>
              <button
                className="text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6  text-lg"
                type="button"
                onClick={(e) => {
                  navigate("/priceListform");
                }}
              >
                Agregar Lista de Precios <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="border rounded-md w-full">
              <Table columns={columns} data={priceList} />
            </div>
          </>
        ) : (
          <EmptyResponse
            message={"No hay listas de precios registrados"}
            redirectRoute={"priceListForm"}
            addMessage={"Agregar Lista de precios"}
          />
        )}
      </div>
    </Layout>
  );
}
