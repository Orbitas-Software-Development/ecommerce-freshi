import { React, useEffect, useState } from "react";
import branchStore from "../../stores/branchesStore";
import { getUserInfo } from "../../utils/localStorage/functions";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Tables/Table/Table";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import SimpleModal from "../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../utils/http/functions";
export default function BranchesDashboard() {
  //global
  const branches = branchStore((state) => state.branches);
  const setBranches = branchStore((state) => state.setBranches);
  //local
  const [deleteLoading, setDeleteLoading] = useState(false);
  //route
  const navigate = new useNavigate();
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
        `${process.env.REACT_APP_PROD}/getBranchByClient/${
          getUserInfo().companyId
        }`
      )
      .then((res) => {
        setBranches(res.data);
        setModalData({
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e);
        errorResponseModalHandle({
          route: "/admindashboard",
          navigate: navigate,
          setModalData,
        });
      });
  }, []);
  const columns = [
    {
      name: "Editar",
      center: true,
      cell: (branch) => (
        <button
          className="py-2 px-4 m-2 text-lg bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded-md "
          type="button"
          onClick={(e) => navigate("/branchForm", { state: branch })}
        >
          <i class="fa-solid fa-pencil"></i>
        </button>
      ),
    },
    {
      name: "Eliminar",
      center: true,
      cell: (row) => (
        <button
          className=" py-2 px-4 m-2 bg-red-500 hover:bg-red-600 text-white font-bold  rounded-md  text-lg"
          type="button"
          onClick={(e) => deleteBranch(row.id)}
        >
          <i class="fa-solid fa-trash-can"></i>
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
      name: "E-mail",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.email,
    },
    {
      name: "Télefono",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Dirección",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.direction,
    },
    {
      name: "Latitud",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.latitude,
    },
    {
      name: "Longitud",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.longitude,
    },
    {
      name: "Cliente",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.clientDTO.name,
    },
  ];
  const deleteBranch = (branchId) => {
    setModalData({
      loading: true,
      text: <>Eliminando</>,
      icon: "loading",
    });
    axios
      .delete(`${process.env.REACT_APP_PROD}/deleteBranchById/${branchId}`)
      .then((res) => {
        setModalData({
          loading: false,
        });
        axios
          .get(
            `${process.env.REACT_APP_PROD}/getBranchByClient/${
              getUserInfo().companyId
            }`
          )
          .then((res) => {
            setBranches(res.data);
            okResponseModalHandle({
              setModalData,
              time: 1000,
              message: "Eliminado",
            });
          });
      })
      .catch((e) => {
        errorResponseModalHandle({
          setModalData,
          time: 3000,
        });
      });
  };

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start p-5">
        <button
          type="submit"
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center "
          onClick={(e) => {
            navigate("/admindashboard");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Sucursales
          </h1>
        </div>

        {branches.length > 0 ? (
          <>
            <div>
              <button
                className="text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6  text-lg"
                type="button"
                onClick={(e) => {
                  navigate("/branchform");
                }}
              >
                Agregar Sucursal <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="border rounded-md w-full">
              <Table columns={columns} data={branches} />
            </div>
          </>
        ) : (
          <>
            <div className=" w-full text-center">
              <p className="mt-4  font-semibold text-xl">
                No hay Sucursales registradas
              </p>{" "}
              <button
                className="text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6"
                type="button"
                onClick={(e) => {
                  navigate("/branchform");
                }}
              >
                <>
                  Agregar sucursal <i class="fa-solid fa-plus"></i>
                </>
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
