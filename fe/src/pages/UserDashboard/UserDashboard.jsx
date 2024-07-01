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
import SimpleModal from "../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../utils/http/functions";
export default function UserDashboard() {
  //global
  const user = getUserInfo();
  const clients = clientStore((state) => state.clients);
  const setClients = clientStore((state) => state.setClients);
  //local
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  //modal
  const [modalData, setModalData] = useState(false);
  const navigate = new useNavigate();
  //GetUsers
  useEffect(() => {
    setModalData({
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    axios
      .get(`${process.env.REACT_APP_PROD}/getUserByCompanyId/${user.companyId}`)
      .then((res) => {
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

  const deleteUser = (clientId, companyId) => {
    setModalData({
      loading: true,
      text: <>Eliminando</>,
      icon: "loading",
    });
    axios
      .delete(
        `${process.env.REACT_APP_PROD}/deleteUser/${clientId}/${companyId}`
      )
      .then((res) => {
        setClients(res.data);
        okResponseModalHandle({
          setModalData,
          time: 1000,
          message: "Eliminado",
        });
      })
      .catch((e) => {
        console.log(e);
        errorResponseModalHandle({
          setModalData,
          time: 3000,
        });
      });
  };

  const updateClient = () => {
    setUpdateLoading(true);
    axios
      .put(`${process.env.REACT_APP_PROD}/updateClients`, clients)
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
      name: "Editar",
      center: true,
      cell: (user) => (
        <button
          className=" py-2 px-4 m-2 text-lg bg-blue-500 hover:bg-blue-600 text-white font-bold   rounded-md "
          type="button"
          onClick={(e) => navigate("/userForm", { state: user })}
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
          className=" py-2 px-4 m-2 text-lg bg-red-500 hover:bg-red-600 text-white font-bold rounded-md "
          type="button"
          onClick={(e) => deleteUser(row.id, user.companyId)}
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      ),
    },
    {
      name: "Usuario",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.userName,
    },
    {
      name: "Nombre",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.fullName,
    },
    {
      name: "Identificación",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.personalIdentification,
    },
    {
      name: "Sucursal",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.branch?.name,
    },
    {
      name: "Cliente",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.branch?.client?.name,
    },
    {
      name: "Verificación",
      center: true,
      selector: (row) =>
        row.emailConfirmed ? (
          <i
            className="fa-solid fa-square-check  fa-2xl  my-4"
            style={{ color: "#63E6BE " }}
          ></i>
        ) : (
          <i
            className="fa-solid fa-circle-xmark fa-2xl my-4"
            style={{ color: "#e66565" }}
          ></i>
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
            className="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                    Agregar Usuario <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="border rounded-md w-full">
                  <Table columns={columns} data={clients} />
                </div>
                <div className="text-center w-full"></div>
              </>
            ) : (
              <EmptyResponse
                message={"No hay Usuarios registrados"}
                redirectRoute={"userForm"}
                addMessage={"Agregar Usuario"}
              />
            )}
          </>
        </div>
      }
    </Layout>
  );
}
