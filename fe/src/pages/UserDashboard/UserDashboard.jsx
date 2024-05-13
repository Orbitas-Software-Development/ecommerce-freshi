import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Tables/Table/Table";
import clientStore from "../../stores/clientStore";
import axios from "axios";
import { getUserInfo } from "../../utils/localStorage/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyResponse from "../../components/EmptyResponse/EmptyResponse";

export default function UserDashboard() {
  //global
  const userLocalStorage = getUserInfo();
  const clients = clientStore((state) => state.clients);
  const setClients = clientStore((state) => state.setClients);
  //local
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(true);

  const navigate = new useNavigate();
  //GetUsers
  useEffect(() => {
    axios
      .get(
        `https://localhost:7065/getUserByCompanyId/${userLocalStorage.companyId}`
      )
      .then((res) => {
        setGetLoading(false);
        setClients(res.data);
      })
      .catch((e) => {
        setGetLoading(false);
        toast("Error al comunicarse con el servidor");
      });
  }, []);

  const deleteClient = (clientId) => {
    setDeleteLoading(true);
    axios
      .delete(`https://localhost:7065/deleteClientById/${clientId}`)
      .then((res) => {
        setClients(res.data);
        toast("Eliminado correctamente");
        setDeleteLoading(false);
      })
      .catch((e) => {
        toast("No se ha eliminado");
        setDeleteLoading(false);
      });
  };

  const updateClient = () => {
    setUpdateLoading(true);
    axios
      .put(`https://localhost:7065/updateClients`, clients)
      .then((res) => {
        setClients(res.data);
        toast("Actualizado correctamente");
        setUpdateLoading(false);
      })
      .catch((e) => {
        toast("No se ha Actualizado");
        setUpdateLoading(false);
      });
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Usuario",
      selector: (row) => row.userName,
    },
    {
      name: "Nombre",
      selector: (row) => row.fullName,
    },
    {
      name: "Identificación",
      selector: (row) => row.personalIdentification,
    },
    {
      name: "Sucursal",
      selector: (row) => row.branch.name,
    },
    {
      name: "Cliente",
      selector: (row) => row.branch.client.name,
    },
    {
      name: "Veficación",
      selector: (row) =>
        row.emailConfirmed ? (
          <i
            class="fa-solid fa-circle-xmark  fa-2xl"
            style={{ color: "#e66565 " }}
          ></i>
        ) : (
          <i
            class="fa-solid fa-square-check fa-2xl"
            style={{ color: "#63E6BE" }}
          ></i>
        ),
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className=" text-lg bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md m-4 mx-6"
          type="button"
          onClick={(e) => deleteClient(row.id)}
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

  return (
    <Layout>
      {
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
              Usuarios
            </h1>
          </div>
          <ToastContainer position="bottom-center" />
          {getLoading ? (
            <>
              <div className="text-center w-full p-4 font-bold  text-lg">
                Cargando
                <i class="fa-solid fa-hourglass-half fa-bounce"></i>
              </div>
            </>
          ) : (
            <>
              {clients.length > 0 ? (
                <>
                  <div>
                    <button
                      className=" text-lg text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6"
                      type="button"
                      onClick={(e) => {
                        navigate("/userForm");
                      }}
                    >
                      Agregar Usuario <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>

                  <Table columns={columns} data={clients} />

                  <div className="text-center w-full">
                    <button
                      className=" text-lg text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6"
                      type="button"
                      onClick={(e) => {
                        updateClient();
                      }}
                    >
                      {!updateLoading ? (
                        <>
                          Guardar <i class="fa-solid fa-floppy-disk"></i>
                        </>
                      ) : (
                        <>
                          Actualizando
                          <i class="fa-solid fa-hourglass-half fa-bounce"></i>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <EmptyResponse
                  message={"No hay Usuarios registrados"}
                  redirectRoute={"userForm"}
                  addMessage={"Agregar Usuario"}
                />
              )}
            </>
          )}
        </div>
      }
    </Layout>
  );
}
