import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Tables/Table/Table";
import clientStore from "../../stores/clientStore";
import axios from "axios";
import { getUserInfo } from "../../utils/localStorage/functions";
import "react-toastify/dist/ReactToastify.css";
import EmptyResponse from "../../components/EmptyResponse/EmptyResponse";
import SimpleModal from "../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../utils/http/functions";
export default function ClientDashboard() {
  //localstorage
  const user = getUserInfo();
  //global
  const clients = clientStore((state) => state.clients);
  const setClients = clientStore((state) => state.setClients);
  const setLatePayment = clientStore((state) => state.setLatePayload);
  const setActiveUser = clientStore((state) => state.setActiveUser);
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
        `${process.env.REACT_APP_DEV}/getClientByCompanyId/${user.company.id}`
      )
      .then(async (res) => {
        setClients(res.data);
        setModalData({
          loading: false,
        });
      })
      .catch((e) => {
        errorResponseModalHandle({
          route: "/admindashboard",
          navigate: navigate,
          setModalData,
        });
      });
  }, []);

  const deleteClient = async (clientId) => {
    setModalData({
      loading: true,
      text: <>Eliminando</>,
      icon: "loading",
    });

    await axios
      .delete(`${process.env.REACT_APP_DEV}/deleteClientById/${clientId}`)
      .then((res) => {
        setClients(res.data);
        okResponseModalHandle({
          setModalData,
          time: 1000,
          message: "Eliminado",
        });
      })
      .catch((e) => {
        errorResponseModalHandle({
          setModalData,
          time: 3000,
        });
      });
  };

  const updateClient = () => {
    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });
    axios
      .put(`${process.env.REACT_APP_PROD}/updateClients`, clients)
      .then((res) => {
        setClients(res.data);
        okResponseModalHandle({
          setModalData,
          time: 1000,
        });
      })
      .catch((e) => {
        errorResponseModalHandle({
          setModalData,
          time: 3000,
        });
      });
  };

  const columns = [
    {
      name: "Editar",
      center: true,
      cell: (client) => (
        <button
          className="py-2 px-4 m-2  text-lg bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded-md "
          type="button"
          onClick={(e) => navigate("/clientform", { state: client })}
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
          className="py-2 px-4 m-2  text-lg bg-red-500 hover:bg-red-600 text-white font-bold  rounded-md "
          type="button"
          onClick={(e) => deleteClient(row.id)}
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
      name: "Creado",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => new Date(row.createdDate).toLocaleDateString(),
    },
    {
      name: "E-mail",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.email,
    },
    {
      name: "Cédula Jurídica",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.identifier,
    },

    {
      name: "Lista asignada",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.priceListName,
    },
    {
      name: "Moroso",
      center: true,
      wrap: true,
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.latePayment}
          onChange={(e) => setLatePayment(row.id)}
        />
      ),
    },
    {
      name: "Activo",
      center: true,
      wrap: true,
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.isClient}
          onChange={(e) => setActiveUser(row.id)}
        />
      ),
    },
  ];

  return (
    <Layout>
      <SimpleModal data={modalData} />
      {
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
              Clientes
            </h1>
          </div>

          <>
            {clients.length > 0 ? (
              <>
                <div>
                  <button
                    className=" text-lg text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6"
                    type="button"
                    onClick={(e) => {
                      navigate("/clientform");
                    }}
                  >
                    Agregar Cliente <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="border rounded-md w-full">
                  <Table columns={columns} data={clients} />
                </div>
                <div className="text-center w-full">
                  <button
                    className=" text-lg text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6"
                    type="button"
                    onClick={(e) => {
                      updateClient();
                    }}
                  >
                    <>
                      Guardar <i class="fa-solid fa-floppy-disk"></i>
                    </>
                  </button>
                </div>
              </>
            ) : (
              <EmptyResponse
                message={"No hay clientes registrados"}
                redirectRoute={"clientform"}
                addMessage={"Agregar Cliente"}
              />
            )}
          </>
        </div>
      }
    </Layout>
  );
}
