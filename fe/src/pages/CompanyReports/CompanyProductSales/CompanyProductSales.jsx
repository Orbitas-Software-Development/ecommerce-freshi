import { React, useEffect, useState } from "react";
import { productSales } from "../../../utils/DTOs/productSalesDto";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import { getUserInfo } from "../../../utils/localStorage/functions";
import { useNavigate } from "react-router-dom";

import Table from "../../../components/Tables/Table/Table";
import SimpleModal from "../../../components/Modals/SimpleModal";
import clientPriceListStore from "../../../stores/clientPriceList";
import moment from "moment";
export default function CompanyProductSales() {
  //navigate
  const navigate = new useNavigate();
  const [userInfo, setUserInfo] = useState({});
  //local
  const [orders, setOrders] = useState([]);
  //global
  const clientPriceList = clientPriceListStore(
    (state) => state.clientPriceList
  );
  const boxesNumber = (products) => {
    let number = 0;
    products.map((value) => {
      number = number + value.boxes;
    });
    return number;
  };
  const unitsNumber = (products) => {
    let number = 0;
    products.map((value) => {
      number = number + value.units;
    });
    return number;
  };
  const totalNumber = (products) => {
    let number = 0;
    console.log(products);
    products.map((value) => {
      number =
        number +
        value.price * value.units +
        value.price * value.units * porcentageConverter(value.iva);
    });
    return number;
  };
  const [modalData, setModalData] = useState(false);
  //getOrders
  useEffect(() => {
    setModalData({
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    setUserInfo(getUserInfo());
    axios
      .get(
        `${process.env.REACT_APP_PROD}/getOrderByCompanyId/${
          JSON.parse(localStorage.getItem("user")).companyId
        }`
      )
      .then((res) => {
        setOrders(productSales(res.data));
        setModalData({ loading: false });
      });
  }, []);
  var porcentageConverter = (porcentage) => {
    if (porcentage < 10) {
      return parseFloat("0.0" + porcentage.toString());
    }
    return parseFloat("0." + porcentage.toString());
  };

  const columns = [
    {
      name: "#",

      selector: (row, index) => index + 1,
    },
    {
      name: "OC",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.OC,
    },
    {
      name: "Cliente",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.clientName,
    },
    {
      name: "Sucursal",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.branchName,
    },
    {
      name: "Fecha",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) =>
        moment(row.createdDate.toString()).format("DD-MM-YYYY"),
    },
    {
      name: "Categoria",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.category,
    },
    {
      name: "Código",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.code,
    },
    {
      name: "Descripción",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.description,
    },
    {
      name: "IVA",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.iva,
    },
    {
      name: "Cantidad",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.quantity,
    },
    {
      name: "Subtotal",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.subtotal,
    },
    {
      name: "Total",
      sortable: true,
      center: true,
      wrap: true,
      selector: (row) => row.total,
    },
  ];

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full justify-center  p-5 ">
        <h2 className="text-center text-4xl mt-6">{userInfo?.branch?.name}</h2>{" "}
        <h2 className="text-center text-4xl mt-6">
          Ventas detalladas por artículo
        </h2>{" "}
        <button
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={() => {
            navigate("/companyReports");
          }}
        >
          <i class="fa-solid fa-arrow-left text-lg"></i> Atras
        </button>
        <div className="w-full border rounded-md p-2">
          <Table columns={columns} data={orders} exportButton={true} />
        </div>
      </div>
    </Layout>
  );
}
