import React from "react";
import Layout from "../../components/Layout/Layout";
import SimpleCard from "../../components/Cards/SimpleCard/SimpleCard";
export default function AdminDashboard() {
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">Admin</h1>
        </div>
        <div className="mt-4 flex flex-wrap  w-full justify-center">
          <SimpleCard
            titulo={"Clientes"}
            icono={"fa-solid fa-user fa-2xl"}
            route={"clientdashboard"}
          />
          <SimpleCard
            titulo={"Sucursales"}
            icono={"fa-solid fa-code-branch fa-2xl"}
            route={"branchdashboard"}
          />
          <SimpleCard
            titulo={"Usuarios"}
            icono={"fa-solid fa-users fa-2xl"}
            route={"userdashboard"}
          />
          <SimpleCard
            titulo={"Productos"}
            icono={"fa-solid fa-box fa-2xl"}
            route={"products"}
          />
          <SimpleCard
            titulo={"Categoria"}
            icono={"fa-solid fa-layer-group fa-2xl"}
            route={"category"}
          />
          <SimpleCard
            titulo={"IVA"}
            icono={"fa-solid fa-percent fa-2xl"}
            route={"iva"}
          />
          <SimpleCard
            titulo={"Lista de precios"}
            icono={"fa-solid fa-hand-holding-dollar fa-2xl"}
            route={"priceList"}
          />
          <SimpleCard
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
            titulo={"Correos"}
            icono={"fa-solid fa-envelope fa-2xl"}
            route={"emails"}
          />
        </div>
      </div>
    </Layout>
  );
}
