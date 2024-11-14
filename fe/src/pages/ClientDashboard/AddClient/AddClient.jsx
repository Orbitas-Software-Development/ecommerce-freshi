import { React, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
import "react-toastify/dist/ReactToastify.css";
import SimpleModal from "../../../components/Modals/SimpleModal";
import RedirectButton from "../../../components/Buttons/RedirectButton/RedirectButton";
import { validateExistedValue } from "../../../utils/utils";
import clientStore from "../../../stores/clientStore";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../../utils/http/functions";
import { TextButton } from "../../../components/Button/Button";
import { faHome, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
export default function AddClientResco() {
  //global
  const clients = clientStore((state) => state.clients);
  //local
  const [client, setClient] = useState({});
  const [persons, setPersons] = useState([]);
  const [clientPriceList, setClientPriceList] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [priceListSelected, setPriceListSelected] = useState({});
  const [priceListNoRecords, setPriceListNoRecords] = useState("");
  //localhost
  const user = getUserInfo();
  //modal
  const [modalData, setModalData] = useState(false);
  //Route
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  async function handleData(e) {
    console.log(client);
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  }
  //ok response
  //validate existedName

  async function handleSubmit(e) {
    e.preventDefault();
    if (!client?.id && validateExistedValue(clients, client.name, "name")) {
      return errorResponseModalHandle({
        loading: true,
        message: <>{`El cliente: ${client.name}, ya existe`}</>,
        modalIcon: "info",
        setModalData: setModalData,
      });
    }
    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });
    client?.id
      ? axios
          .put(`${process.env.REACT_APP_PROD}/api/client/updateClient`, {
            ...client,
            ["companyId"]: user.companyId,
          })
          .then(async (res) => {
            okResponseModalHandle({
              setModalData,
              route: "/clientdashboard",
              navigate: navigate,
            });
          })
          .catch((e) => {
            errorResponseModalHandle({
              setModalData,
              route: "/clientdashboard",
              navigate: navigate,
            });
          })
      : axios
          .post(`${process.env.REACT_APP_PROD}/createClient`, {
            ...client,
            ["companyId"]: user.companyId,
          })
          .then(async (res) => {
            okResponseModalHandle({
              setModalData,
              route: "/clientdashboard",
              navigate: navigate,
            });
          })
          .catch((e) => {
            errorResponseModalHandle({
              setModalData,
              route: "/clientdashboard",
              navigate: navigate,
            });
          });
  }

  useEffect(() => {
    data && setClient(data);

    setModalData({
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    axios
      .get(`${process.env.REACT_APP_PROD}/api/cuentas/getPersons`)
      .then(async (res) => {
        setPersons(res.data);
        await axios
          .get(
            `${process.env.REACT_APP_PROD}/getListPriceByCompanyId/${user.company.id}`
          )
          .then((res) => {
            console.log(client);
            setPriceList(res.data);
          });
        data?.id &&
          (await axios
            .get(
              `${process.env.REACT_APP_PROD}/api/ClientPriceList/getClientPriceListByClientId/${data?.id}`
            )
            .then(async (res) => {
              setClientPriceList(res.data);
              //valida lista de precios ya seleccionada
              await validatePriceList({
                target: { value: res.data.priceListId, name: "priceListId" },
              });
              setClient({ ...data, ["priceListId"]: res.data.priceListId });
            }));
        setModalData({
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e);
        errorResponseModalHandle({
          route: "/clientdashboard",
          navigate: navigate,
          setModalData,
        });
      });
  }, []);
  //valida lista de precios cuando se selecciona o viene precargada
  const validatePriceList = async (e) => {
    console.log(client);
    setModalData({
      loading: true,
      text: <>Validando lista de precios</>,
      icon: "loading",
    });
    await axios
      .get(
        `${process.env.REACT_APP_PROD}/api/PricelistProduct/getPricelistProductByPriceListId/${e.target.value}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          okResponseModalHandle({
            setModalData,
            message: "Lista de precios con productos",
            modalIcon: "check",
          });
          setPriceListSelected("");
          return handleData(e);
        } else {
          setModalData({
            loading: false,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        errorResponseModalHandle({
          route: "/clientdashboard",
          navigate: navigate,
          setModalData,
        });
      });
  };
  useEffect(() => {}, [client]);

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start">
        <TextButton
          text={"Atras"}
          bgColor={`bg-blue-700`}
          hoverBgColor={`hover:bg-blue-700`}
          hoverTextColor={`hover:text-black`}
          otherProperties="max-w-[120px] mx-4 my-4"
          icon={faHome}
          onClick={(e) => {
            navigate("/clientdashboard");
          }}
        />
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Creación de cliente
          </h1>
        </div>
        <form
          className="pc:w-[50%] movil:w-[100%]  mx-auto my-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              for="name"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Lista de precios
            </label>
            <select
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="priceListId"
              onChange={(e) => {
                var a = priceList.find(
                  (value) => value.id === parseInt(e.target.value)
                );
                setPriceListSelected(a);
                e.target.value !== "" && validatePriceList(e);
              }}
            >
              <option value="">Seleccione Lista de precios</option>
              {priceList.map((value, index) =>
                value.id === clientPriceList?.priceListId ? (
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
            {priceList.length === 0 ? (
              <div className="w-full">
                <RedirectButton
                  message={"No hay lista de precios"}
                  redirect={"/priceList"}
                  actionMessage={"Crear lista de precios"}
                  state={priceListSelected}
                />
              </div>
            ) : (
              priceListSelected && (
                <div className="w-full">
                  <RedirectButton
                    message={"No hay productos asignados para esta lista"}
                    redirect={"/assignProduct"}
                    actionMessage={"Asignar productos"}
                    state={priceListSelected}
                  />
                </div>
              )
            )}
          </div>
          <div className="mb-5">
            <label
              for="name"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Razón Social
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Dígite nombre"
              required
              name="name"
              minLength={4}
              onChange={(e) => {
                handleData(e);
              }}
              autoComplete="off"
              value={client?.name || ""}
            />
          </div>{" "}
          <div className="mb-5">
            <label
              for="person"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Tipo identificación
            </label>
            <select
              id="person"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="personId"
              onChange={(e) => {
                e.target.value !== "" && handleData(e);
              }}
            >
              <option value="">Tipo identificación</option>
              {persons.map((value, index) =>
                value.id === client?.personId ? (
                  <option key={index} value={value.id} selected>
                    {value.name === "legal" ? "Jurídica" : "Física"}
                  </option>
                ) : (
                  <option key={index} value={value.id}>
                    {value.name === "legal" ? "Jurídica" : "Física"}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="mb-5">
            <label
              for="Identifier"
              className="block mb-2 text-lg  font-medium text-gray-900 "
            >
              {client?.personId === "1" ? "Cédula Física" : "Cédula Jurídica"}
            </label>
            <input
              type="number"
              id="Identifier"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="identifier"
              onChange={(e) => handleData(e)}
              placeholder="Dígite identificación"
              min={10000000}
              autoComplete="off"
              value={client?.identifier || ""}
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-lg  font-medium text-gray-900 "
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="email"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite correo electrónico"
              minLength={4}
              autoComplete="off"
              value={client?.email || ""}
            />
          </div>{" "}
          <div className="mb-5">
            <label
              for="direction"
              className="block mb-2 text-lg  font-medium text-gray-900 "
            >
              Dirección
            </label>
            <input
              type="text"
              id="direction"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="direction"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite dirección"
              autoComplete="off"
              value={client?.direction || ""}
            />
          </div>{" "}
          <div className="mb-5">
            <label
              for="phone"
              className="block mb-2 text-lg  font-medium text-gray-900 "
            >
              Teléfono
            </label>
            <input
              type="text"
              minLength={7}
              id="phone"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="phone"
              required
              onChange={(e) => handleData(e)}
              placeholder="Dígite teléfono"
              autoComplete="off"
              value={client?.phone || ""}
            />
          </div>
          <div className="text-center">
            <TextButton
              text={"Guardar"}
              hoverTextColor={`hover:text-black`}
              otherProperties="max-w-[120px] mx-4 my-4"
              type="submit"
              icon={faFloppyDisk}
              onClick={() => {}}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
