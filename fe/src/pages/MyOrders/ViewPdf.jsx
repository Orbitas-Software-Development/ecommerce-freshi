import { React, useState, useEffect } from "react";
import { generatePDF } from "../../utils/reports/generateOrderClient";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import axios from "axios";
import { getUserInfo } from "../../utils/localStorage/functions";
import { useLocation, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
export default function ViewPdf() {
  //local
  const [info, setInfo] = useState({});
  const [orderBase64PDF, setOrderBase64PDF] = useState("");
  //route
  const location = useLocation();
  const data = location.state;
  useEffect(() => {
    axios
      .get(
        `https://localhost:7065/api/companyInformation/getInfo/${
          getUserInfo().branch.client.companyId
        }`
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
    setOrderBase64PDF(generatePDF(data, info.information));
  }, [info]);

  let pdf = generatePDF(data, info);

  return (
    <Layout>
      <div className="w-[100vw] ">
        <Link to="/myorders">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
            type="button"
          >
            <i class="fa-solid fa-arrow-left "></i>Atras
          </button>
        </Link>
        <iframe
          src={orderBase64PDF.format + "," + orderBase64PDF.base64}
          frameborder="0"
          width="100%"
          height="90%"
        ></iframe>
      </div>
    </Layout>
  );
}
