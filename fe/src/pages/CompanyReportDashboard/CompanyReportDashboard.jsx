import React from "react";
import Layout from "../../components/Layout/Layout";
import SimpleCard from "../../components/Cards/SimpleCard/SimpleCard";
import { useNavigate } from "react-router-dom";
export default function CompanyReportDashboard() {
  //route
  const navigate = new useNavigate();
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">Reportes</h1>
        </div>
        <button
          class="text-white w-[100px] text-lg mx-2 my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/admindashboard");
          }}
        >
          Atras
        </button>
        <div className="mt-4 flex flex-wrap  w-full justify-center">
          <SimpleCard
            titulo={"Ordenes de compra"}
            icono={"fa-solid fa-file fa-2xl"}
            route={"companyOrder"}
          />
        </div>
      </div>
    </Layout>
  );
}
