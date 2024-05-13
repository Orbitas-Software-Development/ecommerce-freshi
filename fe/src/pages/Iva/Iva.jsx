import { React, useState, useEffect } from "react";
import axios from "axios";
import { getUserInfo } from "../../utils/localStorage/functions";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Tables/Table/Table";
import { useNavigate } from "react-router-dom";
import EmptyResponse from "../../components/EmptyResponse/EmptyResponse";
export default function Iva() {
  //local
  const [iva, setIva] = useState([]);
  //localStorage
  const user = getUserInfo();
  //Route
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `https://localhost:7065/api/iva/getIvaByCompanyId/${user.company.id}`
      )
      .then((res) => {
        setIva(res.data);
      });
  }, []);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "name",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Porcentage",
      selector: (row) => row.porcentage,
    },
    {
      name: "Editar",
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
      cell: (row) => (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={(e) =>
            axios
              .delete(`https://localhost:7065/api/iva/deleteIva/${row.id}`)
              .then((res) => {
                setIva(res.data);
              })
          }
        >
          Eliminar
        </button>
      ),
    },
  ];
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
            <Table columns={columns} data={iva} />
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
