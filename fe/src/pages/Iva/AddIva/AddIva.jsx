import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
import MicroModal from "react-micro-modal";
import ivaStore from "../../../stores/ivaStore";
import { validateExistedValue } from "../../../utils/utils";
import SimpleModal from "../../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../../utils/http/functions";
export default function AddIva() {
  //global
  const ivaList = ivaStore((state) => state.iva);
  //local
  const [iva, setIva] = useState([]);
  const [action, setAction] = useState([]);
  //modal
  const [modalData, setModalData] = useState(false);
  //localStorage
  const user = getUserInfo();
  //Route
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  async function handleData(e) {
    setIva({
      ...iva,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!iva?.id && validateExistedValue(ivaList, iva.name, "name")) {
      return errorResponseModalHandle({
        loading: true,
        message: <>{`${iva.name} ya existe`}</>,
        modalIcon: "info",
        setModalData: setModalData,
      });
    }
    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });
    iva.companyId = user.companyId;

    iva?.id
      ? axios
          .put(`${process.env.REACT_APP_PROD}/api/iva/updateIva`, iva)
          .then((res) => {
            navigate("/iva");
          })
      : axios
          .post(`${process.env.REACT_APP_PROD}/api/iva/createIva`, iva)
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/iva",
              navigate: navigate,
            });
          });
  }
  useEffect(() => {
    data && setIva(data);
  }, []);

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start">
        <button
          className="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/iva");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">IVA</h1>
        </div>
        <form
          className="pc:w-[50%] movil:w-[100%]   mx-auto my-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <div class="mb-5">
            <label
              for="name"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="mb-4 bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite nombre"
              required
              name="name"
              onChange={(e) => handleData(e)}
              value={iva?.name || ""}
              autocomplete="off"
            />
            <label
              for="description"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Descripción
            </label>
            <input
              type="text"
              id="description"
              className="mb-4 bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite descripción"
              required
              name="description"
              onChange={(e) => handleData(e)}
              value={iva?.description || ""}
              autocomplete="off"
            />{" "}
            <label
              for="porcentage"
              class="block mb-2 text-lg font-medium text-gray-900 "
            >
              Porcentage
            </label>
            <input
              type="number"
              id="porcentage"
              className="mb-4 bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite porcentage IVA"
              required
              name="porcentage"
              onChange={(e) => handleData(e)}
              value={iva?.porcentage || ""}
              autocomplete="off"
            />
            <div className="text-center">
              <button
                type="submit"
                className="min-w-[200px] text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
