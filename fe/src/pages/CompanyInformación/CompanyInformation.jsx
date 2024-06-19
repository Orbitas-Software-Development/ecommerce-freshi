import { React, useState, useEffect } from "react";
import axios from "axios";
import { getUserInfo } from "../../utils/localStorage/functions";
import MicroModal from "react-micro-modal";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import SimpleModal from "../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../utils/http/functions";
export default function CompanyInformation() {
  //localStorage
  const user = getUserInfo();
  //local
  const [information, setInformation] = useState();
  const [action, setAction] = useState(false);
  //Route
  const navigate = new useNavigate();
  //modal
  const [modalData, setModalData] = useState(false);
  const handleData = (e) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };

  //Guarda los datos
  async function handleSubmit(e) {
    e.preventDefault();
    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });
    axios
      .post(`${process.env.REACT_APP_PROD}/api/companyInformation/saveInfo`, {
        ...information,
        ["companyId"]: user.companyId,
      })
      .then((res) => {
        setModalData({
          loading: false,
        });
        res.data.information && setInformation(res.data.information);
      })
      .catch((e) => {
        console.log(e);
        errorResponseModalHandle({
          message: "Error al Guardar",
          route: "/admindashboard",
          navigate: navigate,
        });
      });
  }

  //obtiene la info
  useEffect(() => {
    setModalData({
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    axios
      .get(
        `${process.env.REACT_APP_PROD}/api/companyInformation/getInfo/${user.companyId}`
      )
      .then((res) => {
        setModalData({
          loading: false,
        });
        res.data.information && setInformation(res.data.information);
      })
      .catch((e) => {
        errorResponseModalHandle({
          message: "Cargar los datos",
          route: "/admindashboard",
          setModalData,
          navigate: navigate,
        });
        console.log(e);
      });
  }, []);

  return (
    <Layout>
      <SimpleModal data={modalData} />
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
            Información Compañia
          </h1>
        </div>

        <MicroModal
          openInitially={false}
          open={action}
          trigger={(open) => <div onClick={open}></div>}
        >
          {(close) => (
            <button onClick={close}>
              <p className="text-xl">
                Cargando <i class="fa-solid fa-circle-notch fa-spin fa-lg"></i>{" "}
              </p>
            </button>
          )}
        </MicroModal>
        <form
          class="w-3/6 mx-auto mt-4 border rounded-md p-8 mb-5"
          onSubmit={handleSubmit}
        >
          <div class="mb-5">
            <label
              for="provider"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Proveedor
            </label>
            <input
              type="text"
              id="provider"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digíte roveedor"
              required
              name="provider"
              value={information?.provider || ""}
              onChange={(e) => handleData(e)}
            />
          </div>
          <div class="mb-5">
            <label
              for="identifier"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Cédula jurídica
            </label>
            <input
              type="text"
              id="identifier"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digíte Cédula Jurídica"
              required
              name="identifier"
              value={information?.identifier || ""}
              onChange={(e) => handleData(e)}
            />
          </div>
          <div class="mb-5">
            <label
              for="phone"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digíte Cédula Jurídica"
              required
              name="phone"
              value={information?.phone || ""}
              onChange={(e) => handleData(e)}
            />
          </div>
          <div class="mb-5">
            <label
              for="email"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Cédula Jurídica
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="email"
              required
              onChange={(e) => handleData(e)}
              value={information?.email || ""}
              placeholder="Dígite correo"
            />
          </div>
          <div class="mb-5">
            <label
              for="phone"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direction"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="direction"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite dirección"
              value={information?.direction || ""}
            />
          </div>
          <div class="mb-5">
            <label
              for="phone"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Texto Parametrizable (Órden de Compra)
            </label>
            <textarea
              type="text"
              id="parameterizableText"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="parameterizableText"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite el Texto"
              value={information?.parameterizableText || ""}
            />
          </div>{" "}
          <div class="mb-5">
            <label
              for="phone"
              class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
            >
              Texto Morosidad (Órden de Compra)
            </label>
            <textarea
              type="text"
              id="latePaymentMessage"
              class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="latePaymentMessage"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite el Texto"
              value={information?.latePaymentMessage || ""}
            />
          </div>
          <button
            type="submit"
            class="text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Guardar
          </button>
        </form>
      </div>
    </Layout>
  );
}
