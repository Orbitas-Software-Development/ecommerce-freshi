import { React, useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
import "react-toastify/dist/ReactToastify.css";
import SimpleModal from "../../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../../utils/http/functions";
import RedirectButton from "../../../components/Buttons/RedirectButton/RedirectButton";
import { validateExistedValue } from "../../../utils/utils";
import branchStore from "../../../stores/branchesStore";
export default function AddBranch() {
  const user = getUserInfo();
  //local
  const [branch, setBranch] = useState({});
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  //global
  const branches = branchStore((state) => state.branches);
  //route
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  //modal
  const [modalData, setModalData] = useState(false);
  async function handleData(e) {
    setBranch({
      ...branch,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!branch?.id && validateExistedValue(branches, branch.name, "name")) {
      return errorResponseModalHandle({
        loading: true,
        message: <>{`La sucursal: ${branch.name}, ya existe`}</>,
        icon: "info",
        setModalData: setModalData,
      });
    }

    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });

    branch?.id
      ? axios
          .put(`${process.env.REACT_APP_PROD}/api/branch/updateBranch`, branch)
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/branchdashboard",
              navigate: navigate,
            });
          })
      : axios
          .post(`${process.env.REACT_APP_PROD}/api/branch/createBranch`, branch)
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/branchdashboard",
              navigate: navigate,
            });
          })
          .catch((e) => {
            console.log(e);
            errorResponseModalHandle({
              setModalData,
              route: "/branchdashboard",
              navigate: navigate,
            });
          });
  }

  useEffect(() => {
    data && setBranch(data);
    setModalData({
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    axios
      .get(
        `${process.env.REACT_APP_PROD}/getClientByCompanyId/${user.company.id}`
      )
      .then((res) => {
        setClients(res.data);
        setModalData({
          loading: false,
        });
        /* axios
          .get(
            `${process.env.REACT_APP_PROD}/getListPriceByCompanyId/${user.company.id}`
          )
          .then((res) => {
            setPriceList(res.data);
            setModalData({
              loading: false,
            });
          });*/
      })
      .catch((e) => {
        console.log(e);
        errorResponseModalHandle({
          route: "/branchdashboard",
          navigate: navigate,
          setModalData,
        });
      });
  }, []);

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start">
        <button
          type="submit"
          className="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/branchdashboard");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Creación de Sucursal
          </h1>
        </div>
        <form
          class="pc:w-[50%] movil:w-[100%]   mx-auto my-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <div class="mb-5">
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Cliente
            </label>
            <select
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="clientId"
              onChange={(e) => {
                e.target.value !== "" && handleData(e);
              }}
            >
              <option value="">Seleccione Cliente</option>
              {clients.map((value, index) =>
                value.id === branch?.clientId ? (
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
          </div>
          <div class="mb-5">
            <label
              for="name"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Nombre de Sucursal
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dígite nombre"
              required
              name="name"
              onChange={(e) => handleData(e)}
              value={branch?.name || ""}
            />
          </div>

          <div class="mb-5">
            <label
              for="phoneNumber"
              className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Télefono
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="phoneNumber"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite Teléfono"
              value={branch?.phoneNumber || ""}
            />
            <label
              for="direction"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direction"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="direction"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite Dirección"
              autoComplete="off"
              value={branch?.direction || ""}
            />
            <label
              for="latitude"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Latitud
            </label>
            <input
              type="text"
              id="latitude"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="latitude"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite Latitud"
              autoComplete="off"
              value={branch?.latitude || ""}
            />
            <label
              for="longitud"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Longitud
            </label>
            <input
              type="text"
              id="longitude"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="longitude"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite longitude"
              autoComplete="off"
              value={branch?.longitude || ""}
            />
            <a
              target="blank"
              href={`https://www.google.com/maps/@${branch.longitude},${branch.latitude},12.00z?entry=ttu`}
              onClick={() => {}}
            >
              <button
                type="button"
                className="mt-4 min-w-[200px] text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Checkear localización
              </button>
            </a>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="min-w-[200px] text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
