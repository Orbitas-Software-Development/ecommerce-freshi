import { React, useState, useEffect } from "react";

import { getRole } from "../../utils/localStorage/functions";
import { useLocation, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
export default function ViewPdf() {
  //local
  const [info, setInfo] = useState({});
  const [orderBase64PDF, setOrderBase64PDF] = useState("");
  //route
  const location = useLocation();
  //localstorage
  let role = getRole();
  useEffect(() => {
    setOrderBase64PDF(location.state.pdfReport);
  }, [info]);

  return (
    <Layout>
      <div className="w-[100vw] ">
        <Link to={`${role === "admin" ? "/companyOrder" : "/myorders"}`}>
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
            type="button"
          >
            <i class="fa-solid fa-arrow-left "></i>Atras
          </button>
        </Link>
        <iframe
          src={
            "data:application/pdf;filename=generated.pdf;base64" +
            "," +
            orderBase64PDF
          }
          frameborder="0"
          width="100%"
          height="90%"
        ></iframe>
      </div>
    </Layout>
  );
}
