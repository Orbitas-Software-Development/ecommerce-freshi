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
import MicroModal from "react-micro-modal";
import { orderDetailsDto } from "../../utils/DTOs/orderDetailsDto";
import orderDetailStore from "../../stores/orderDetailStore";
import Signature from "../../components/Signature/Signature";
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
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //globalset
  const signature = orderDetailStore((state) => state.signature);
  const productsList = productStore((state) => state.products);
  const cancelProducts = productStore((state) => state.cancelProducts);
  const navigate = useNavigate();
  const notify = () => toast("Orden procesada correctamente");

  const sent = async () => {
    setLoading(true);
    axios
      .post("https://localhost:7065/createOrder", {
        UserName: getUserInfo().userName,
        branchId: userInfo.branchId,
        pdfReport: orderBase64PDF.base64,
        userId: userInfo.id,
        orderDetails: orderDetailsDto(productsList),
        SignatureBase64: signature,
      })
      .then((res) => {
        // notify();
        cancelProducts();
        setProcessed(true);
        sleep(1300).then(() => {
          navigate("/myorders");
        });
      });
  };
  useEffect(() => {
    axios
      .get(
        `https://localhost:7065/api/companyInformation/getInfo/${user.branch.client.companyId}`
      )
      .then((res) => {
        setInfo(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // orderDetailsDTO();
  }, []);
  useEffect(() => {
    setUserInfo(getUserInfo());
    setOrderBase64PDF(generatePDF(productsList, info.information));
  }, [info]);

  return (
    <Layout>
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
                confirmed={confirmed}
              />
            }

            {/*
              <button
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md my-4 mx-6 text-lg"
                onClick={(e) => sent()}
              >
                "Procesar pedido"
              </button>
            */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
