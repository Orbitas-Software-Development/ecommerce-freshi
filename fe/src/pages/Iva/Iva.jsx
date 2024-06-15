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
export default function Iva() {
  //local
  const [iva, setIva] = useState([]);
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
        `${process.env.REACT_APP_PROD}/api/iva/getIvaByCompanyId/${user.company.id}`
      )
      .then((res) => {
        setIva(res.data);
        setModalData({
          loading: false,
        });
      })
      .catch((res) => {
        errorResponseModalHandle({
          route: "/admindashboard",
          navigate: navigate,
          setModalData,
        });
      });
  }, []);
  let deleteIva = async (ivaId) => {
    setModalData({
      loading: true,
      text: <>Eliminando</>,
      icon: "loading",
    });

    let res = await axios.get(
      `${process.env.REACT_APP_PROD}/api/product/getProductByIvaId/${ivaId}`
    );
    if (res.data > 0)
      return errorResponseModalHandle({
        message: "No se puede borrar, tiene varios productos asociados",
        setModalData,
        modalIcon: "info",
      });
    await axios
      .delete(`${process.env.REACT_APP_PROD}/api/iva/deleteIva/${ivaId}`)
      .then((res) => {
        setIva(res.data);
        okResponseModalHandle({
          setModalData,
          time: 1000,
          message: "Eliminado",
        });
      })
      .catch((err) => {
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
      selector: (row, index) => index + 1,
    },
    {
      name: "name",
      sortable: true,
      center: true,
      selector: (row) => row.name,
    },
    {
      name: "Description",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.description,
    },
    {
      name: "Porcentage",
      sortable: true,
      center: true,
      selector: (row) => row.porcentage,
    },
    {
      name: "Editar",
      center: true,
      cell: (row) => (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={(e) => navigate("/addIva", { state: row })}
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
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={(e) => deleteIva(row.id)}
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
          <h1 className="mt-4 font-semibold text-3xl text-center">IVA</h1>
        </div>{" "}
        {iva.length > 0 ? (
          <>
            <div>
              <button
                className="text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6  text-lg"
                type="button"
                onClick={(e) => {
                  navigate("/addIva");
                }}
              >
                Agregar IVA <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="border rounded-md w-full">
              <Table columns={columns} data={iva} />
            </div>
          </>
        ) : (
          <EmptyResponse
            message={"No hay listas de precios registrados"}
            redirectRoute={"ivaForm"}
            addMessage={"Agregar IVA"}
          />
        )}
      </div>
    </Layout>
  );
}
