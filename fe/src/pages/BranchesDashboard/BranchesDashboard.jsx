import { React, useEffect, useState } from "react";
import branchStore from "../../stores/branchesStore";
import { getUserInfo } from "../../utils/localStorage/functions";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Tables/Table/Table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BranchesDashboard() {
  const branches = branchStore((state) => state.branches);
  const setBranches = branchStore((state) => state.setBranches);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = new useNavigate();
  useEffect(() => {
    axios
      .get(
        `https://localhost:7065/getBranchByClient/${getUserInfo().companyId}`
      )
      .then((res) => {
        setBranches(res.data);
      });
  }, []);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Creado",
      selector: (row) => new Date(row.createdDate).toLocaleDateString(),
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
    },
    {
      name: "Télefono",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Dirección",
      selector: (row) => row.direction,
    },
    {
      name: "Latitud",
      selector: (row) => row.latitude,
    },
    {
      name: "Longitud",
      selector: (row) => row.longitude,
    },
    {
      name: "Cliente",
      selector: (row) => row.client.name,
    },
    /* {
      name: "Lista de Precios",
      selector: (row) => row.pricelist.name,
    },*/
    {
      name: "Action",
      cell: (row) => (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={(e) => deleteBranch(row.id)}
        >
          {!deleteLoading ? (
            "Eliminar"
          ) : (
            <i class="fa-solid fa-hourglass-half fa-bounce"></i>
          )}
        </button>
      ),
    },
  ];
  const deleteBranch = (branchId) => {
    setDeleteLoading(true);
    axios
      .delete(`https://localhost:7065/deleteBranchById/${branchId}`)
      .then((res) => {
        toast("Eliminado correctamente");
        axios
          .get(
            `https://localhost:7065/getBranchByClient/${
              getUserInfo().companyId
            }`
          )
          .then((res) => {
            setBranches(res.data);
          });
        setDeleteLoading(false);
      })
      .catch((e) => {
        toast("No se ha eliminado");
        setDeleteLoading(false);
      });
  };

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
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Sucursales
          </h1>
        </div>
        <ToastContainer position="bottom-center" />
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
            <Table columns={columns} data={branches} />
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
