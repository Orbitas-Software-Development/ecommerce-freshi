import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import productStore from "../../stores/productStore";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/localStorage/functions";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generatePDF } from "../../utils/reports/generateOrder";
import SimpleModal from "../../components/Modals/SimpleModal";
import { orderDetailsDto } from "../../utils/DTOs/orderDetailsDto";
import orderDetailStore from "../../stores/orderDetailStore";
import Signature from "../../components/Signature/Signature";
import clientPriceListStore from "../../stores/clientPriceList";
export default function Order() {
  //Signature
  const [loading, setLoading] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  //local
  let user = getUserInfo();
  const [userInfo, setUserInfo] = useState({});
  const [orderBase64PDF, setOrderBase64PDF] = useState("");
  const [info, setInfo] = useState({});
  //global
  const clientPriceList = clientPriceListStore(
    (state) => state.clientPriceList
  );
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const [modalData, setModalData] = useState(false);
  //globalset
  const signature = orderDetailStore((state) => state.signature);
  const productsList = productStore((state) => state.products);
  const cancelProducts = productStore((state) => state.cancelProducts);
  const navigate = useNavigate();

  const sent = async () => {
    setLoading(true);

    const getTotal = () => {
      let totalIva = 0;
      orderDetailsDto(productsList).map((value) => {
        totalIva += value.total;
      });
      return totalIva;
    };
    const getTotalIva = () => {
      let totalIva = 0;
      orderDetailsDto(productsList).map((value) => {
        totalIva += value.totalIva;
      });
      return totalIva;
    };
    setTimeout(function () {
      axios
        .post(`${process.env.REACT_APP_PROD}/createOrder`, {
          UserName: getUserInfo().userName,
          branchId: userInfo.branchId,
          userId: userInfo.id,
          orderDetails: orderDetailsDto(productsList),
          SignatureBase64: signature,
          total: getTotal(),
          totalIva: getTotalIva(),
          currencyId: clientPriceList?.priceList?.currencyId,
        })
        .then((res) => {
          axios
            .post(`${process.env.REACT_APP_PROD}/sendOrderReport`, {
              OrderId: res.data.id,
              ReportBase64: generatePDF({
                productsSelected: productsList,
                companyInfo: info.information,
                signature: signature,
                currencyId: clientPriceList?.priceList?.currencyId,
                orderId: res.data.id,
              }).base64,
            })
            .then((res) => {
              cancelProducts();
              setProcessed(true);
              sleep(1300).then(() => {
                navigate("/myorders");
              });
            });
        });
    }, 3000);
  };
  useEffect(() => {
    productsList.length <= 0 && navigate("/home");
    setModalData({
      loading: true,
      text: <>Generando Reporte</>,
      icon: "loading",
    });
    axios
      .get(
        `${process.env.REACT_APP_PROD}/api/companyInformation/getInfo/${user.branch.client.companyId}`
      )
      .then((res) => {
        setModalData({ loading: false });
        setInfo(res.data);
      })
      .catch((e) => {
        setModalData({ loading: false });
        console.log(e);
      });
  }, []);
  //Se genera el reporte nuevamente
  useEffect(() => {
    setUserInfo(getUserInfo());
    setOrderBase64PDF(
      generatePDF({
        productsSelected: productsList,
        companyInfo: info.information,
        signature: signature,
        currencyId: clientPriceList?.priceList?.currencyId,
      })
    );
  }, [info]);

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <ToastContainer position="bottom-center" />
      <div className="w-[100vw] ">
        <Link to="/cart">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
            type="button"
          >
            <i class="fa-solid fa-arrow-left "></i> Carrito de compras
          </button>
        </Link>
        {Object.entries(info).length > 0 ? (
          <iframe
            className=" border-b-2 border-black"
            src={orderBase64PDF.format + "," + orderBase64PDF.base64}
            frameborder="0"
            width="100%"
            height="80%"
            charset="UTF-8"
          ></iframe>
        ) : (
          <></>
        )}

        <div>
          <div className="text-center">
            {
              <Signature
                action={sent}
                loading={loading}
                processed={processed}
              />
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}
