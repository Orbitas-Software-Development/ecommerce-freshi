import { React, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import SimpleCard from "../../components/Cards/SimpleCard/SimpleCard";
import SimpleModal from "../../components/Modals/SimpleModal";
import axios from "axios";
import { getUserInfo, getName } from "../../utils/localStorage/functions";
import companyInformationStore from "../../stores/companyInformationStore";
import companyOrderState from "../../stores/companyOrderStore";
import { useNavigate } from "react-router-dom";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../utils/http/functions";
import "./style.css";
import { openModal, modalClose } from "./script";
import ExpandModal from "../../components/Modals/expandModal";
export default function AdminDashboard() {
  //navigate
  const navigate = useNavigate();
  //localStorage
  const user = getUserInfo();
  const [basicInfo, setBasicInfo] = useState(false);
  //global
  const companyInformation = companyInformationStore(
    (state) => state.companyInformation
  );
  const setCompanyInformation = companyInformationStore(
    (state) => state.setCompanyInformation
  );
  const companyOrder = companyOrderState((state) => state.companyOrder);
  const setCompanyOrder = companyOrderState((state) => state.setCompanyOrder);
  //expanded modal
  const [modalData, setModalData] = useState({});
  //expanded modal
  const [extendedmodalData, setExtendedModalData] = useState(false);

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
        res.data.information && setCompanyInformation(res.data.information);
        axios
          .get(
            `${process.env.REACT_APP_PROD}/api/report/getReport/${user.companyId}/Orden de compra`
          )
          .then((res) => {
            setCompanyOrder(
              Object.keys(res.data.report ? res.data.report : {}).length > 0
            );
            setExtendedModalData(!res.data.report);
            setModalData({
              loading: false,
            });
            setBasicInfo(true);
          });
      })
      .catch((e) => {
        setCompanyInformation(e.response.data.information);
        setBasicInfo(true);
        setExtendedModalData(true);
      });
  }, []);

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col">
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Administrador
          </h1>
        </div>

        <div className="mt-4 flex flex-wrap  w-full justify-center">
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"Clientes"}
            icono={"fa-solid fa-user fa-2xl"}
            route={"clientdashboard"}
          />
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"Sucursales"}
            icono={"fa-solid fa-code-branch fa-2xl"}
            route={"branchdashboard"}
          />
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"Usuarios"}
            icono={"fa-solid fa-users fa-2xl"}
            route={"userdashboard"}
          />
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"Productos"}
            icono={"fa-solid fa-box fa-2xl"}
            route={"products"}
          />
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"Categoría"}
            icono={"fa-solid fa-layer-group fa-2xl"}
            route={"category"}
          />
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"IVA"}
            icono={"fa-solid fa-percent fa-2xl"}
            route={"iva"}
          />
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"Lista de precios"}
            icono={"fa-solid fa-hand-holding-dollar fa-2xl"}
            route={"priceList"}
          />
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"Información Company"}
            icono={"fa-solid fa-users fa-2xl"}
            route={"CompanyInformation"}
          />
          {/*   <SimpleCard
            titulo={"Pedidos"}
            icono={"fa-solid fa-users fa-2xl"}
            route={"CompanyOrders"}
  />{" "}*/}
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"Correos"}
            icono={"fa-solid fa-envelope fa-2xl"}
            route={"emails"}
          />{" "}
          <SimpleCard
            disabled={!companyInformation || !companyOrder}
            titulo={"Reportes"}
            icono={"fa-solid fa-file-lines fa-2xl"}
            route={"companyReports"}
          />
        </div>
      </div>
      <ExpandModal
        title={`Bienvenido ${getName()}`}
        openExpandedModal={extendedmodalData}
        setOpenExpandedModal={setExtendedModalData}
        child={() => (
          <>
            {" "}
            {basicInfo && (
              <>
                {companyInformation === false || companyOrder === false ? (
                  <div className="w-full p-4">
                    <h1 className="mt-4 font-semibold text-lg text-start">
                      {`Hola, ${getName()} tienes las siguientes acciones pendientes:`}
                    </h1>
                    {!companyInformation && (
                      <h1 className="mt-4 font-semibold text text-start">
                        - Completar la información de la empresa.
                        <button
                          onClick={() => {
                            navigate("/CompanyInformation");
                          }}
                          className="text-white w-[150px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Completar
                        </button>
                      </h1>
                    )}
                    {!companyOrder && (
                      <h1 className="mt-4 font-semibold text text-start">
                        -Completar información para la orden de compra.
                        <button
                          onClick={() => {
                            navigate("/emails");
                          }}
                          className="text-white w-[150px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Asignar
                        </button>
                      </h1>
                    )}
                  </div>
                ) : null}
              </>
            )}
          </>
        )}
      />
    </Layout>
  );
}
