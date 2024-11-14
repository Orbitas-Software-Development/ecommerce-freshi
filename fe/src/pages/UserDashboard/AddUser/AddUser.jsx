import { React, useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo } from "../../../utils/localStorage/functions";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import RedirectButton from "../../../components/Buttons/RedirectButton/RedirectButton";
import SimpleModal from "../../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../../utils/http/functions";
export default function AddUser() {
  //local
  const [branches, setBranches] = useState([]);
  const [clients, setClient] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  //route
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  //modal
  const [modalData, setModalData] = useState(false);
  async function handleData(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });
    user?.id
      ? axios
          .put(`${process.env.REACT_APP_PROD}/api/cuentas/updateUser`, {
            ...user,
          })
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/userdashboard",
              navigate: navigate,
            });
          })
          .catch((e) => {
            console.log(e);
            errorResponseModalHandle({
              setModalData,
              route: "/userdashboard",
              navigate: navigate,
            });
          })
      : createBranch();
  }
  const createBranch = () => {
    axios
      .post(`${process.env.REACT_APP_PROD}/api/cuentas/register`, {
        ...user,
        ["password"]: user.userName,
      })
      .then((res) => {
        okResponseModalHandle({
          setModalData,
          route: "/userdashboard",
          navigate: navigate,
        });
      })
      .catch((e) => {
        e.response.status === 400
          ? errorResponseModalHandle({
              message: `El usuario o correo ya existe: ${
                e.response.data.email !== null ? e.response.data.email : ""
              } ${
                e.response.data.userName !== null
                  ? e.response.data.userName
                  : ""
              }`,
              setModalData,
              route: "/userdashboard",
              navigate: navigate,
              time: 3000,
            })
          : errorResponseModalHandle({
              setModalData,
              route: "/userdashboard",
              navigate: navigate,
            });
      });
  };
  useEffect(() => {
    data && setUser({ ...data, clientId: data.branch.clientId });
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
        axios
          .get(
            `${process.env.REACT_APP_PROD}/getClientByCompanyId/${
              getUserInfo().companyId
            }`
          )
          .then((res) => {
            console.log(res.data);
            setModalData({
              loading: false,
            });
            setClient(res.data);
          })
          .catch((e) => {
            console.log(e);
            errorResponseModalHandle({
              setModalData,
              route: "/userdashboard",
              navigate: navigate,
            });
          });
      });
  }, []);

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start">
        <button
          type="submit"
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center "
          onClick={(e) => {
            navigate("/userdashboard");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Registro de usuarios
          </h1>
        </div>
        <ToastContainer position="bottom-center" />
        <form
          class="pc:w-[50%] movil:w-[100%]   mx-auto mt-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <div class="mb-5">
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900"
            >
              Cliente
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="clientId"
              onChange={(e) => {
                handleData(e);
              }}
              required
            >
              <option value="">Seleccione Cliente</option>
              {clients.map((value, index) =>
                value.id === user?.clientId ? (
                  <option key={index} value={value.id} selected>
                    {value.name}
                  </option>
                ) : (
                  <option key={index} value={value.id}>
                    {value.name}
                  </option>
                )
              )}
            </select>
            {clients.length === 0 && (
              <>
                <div className="w-full">
                  <RedirectButton
                    message={"No hay clientes Registrados"}
                    redirect={"/clientForm"}
                    actionMessage={"Registar cliente"}
                  />
                </div>
              </>
            )}
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900"
            >
              Sucursal
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="branchId"
              onChange={(e) => {
                e.target.value !== "" && handleData(e);
              }}
              required
            >
              <option value="">Seleccione Sucursal</option>
              {user?.clientId
                ? branches.map((value, index) => (
                    <>
                      {value.clientId === parseInt(user?.clientId) ? (
                        <>
                          {user?.branchId == value.id ? (
                            <option key={index} value={value.id} selected>
                              {value.name}
                            </option>
                          ) : (
                            <option key={index} value={value.id}>
                              {value.name}
                            </option>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ))
                : user.clientId &&
                  branches.map((value, index) => (
                    <>
                      value.clientId === user.clientId && (
                      <option key={index} value={value.id}>
                        {value.name}
                      </option>
                      )
                    </>
                  ))}
            </select>
            {branches.length === 0 && (
              <>
                <div className="w-full">
                  <RedirectButton
                    message={"No hay sucursales Registradas"}
                    redirect={"/branchForm"}
                    actionMessage={"Registar Sucursal"}
                  />
                </div>
              </>
            )}
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite email"
              required
              name="email"
              onChange={(e) => handleData(e)}
              autoComplete="off"
              value={user?.email || ""}
            />
            <label
              for="userName"
              class="block mb-2 text-lg font-medium text-gray-900"
            >
              Usuario
            </label>
            <input
              type="text"
              id="userName"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite usuario"
              required
              name="userName"
              onChange={(e) => handleData(e)}
              autoComplete="off"
              value={user?.userName || ""}
              minLength={5}
            />{" "}
            <label
              for="fullName"
              class="block mb-2 text-lg font-medium text-gray-900"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite nombre completo"
              required
              name="fullName"
              onChange={(e) => handleData(e)}
              autoComplete="off"
              value={user?.fullName || ""}
            />
            <label
              for="personalIdentification"
              class="block mb-2 text-lg font-medium text-gray-900"
            >
              Identificación
            </label>
            <input
              type="text"
              id="personalIdentification"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite identificación"
              required
              name="personalIdentification"
              onChange={(e) => handleData(e)}
              autoComplete="off"
              value={user?.personalIdentification || ""}
            />
            <label
              for="jobtTitle"
              class="block mb-2 text-lg font-medium text-gray-900"
            >
              Puesto
            </label>
            <input
              type="text"
              id="jobtTitle"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite puesto"
              required
              name="jobtTitle"
              onChange={(e) => handleData(e)}
              autoComplete="off"
              value={user?.jobtTitle || ""}
            />
            <label
              for="Dígite Dirección"
              class="block mb-2 text-lg font-medium text-gray-900"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direction"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite dirección"
              required
              name="direction"
              onChange={(e) => handleData(e)}
              autoComplete="off"
              value={user?.direction || ""}
            />{" "}
            <div className="text-center">
              <button
                type="submit"
                class="mt-4 min-w-[200px] text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg   sm:w-auto px-5 py-2.5 text-center "
              >
                {loading ? (
                  <i class="fa-solid fa-hourglass-half fa-bounce"></i>
                ) : (
                  "Guardar"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
