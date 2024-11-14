import React from "react";
import SimpleCard from "../../components/Cards/SimpleCard/SimpleCard";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

export default function Emails() {
  const navigate = new useNavigate();
  return (
    <Layout>
      <div className="flex flex-col w-full">
        <div>
          <button
            class="text-white w-[100px] text-lg mx-2 my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center "
            onClick={(e) => {
              navigate("/admindashboard");
            }}
          >
            Atras
          </button>
        </div>
        <div className="w-full flex justify-center items-center ">
          <SimpleCard
            titulo={"Orden de compra"}
            icono={"fa-solid fa-file fa-2xl"}
            route={"editEmail"}
            params={{ state: { report: "Orden de compra" } }}
          />
        </div>
      </div>
    </Layout>
  );
}
