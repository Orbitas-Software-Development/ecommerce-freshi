import { React, useState, useEffect } from "react";
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
        `${process.env.REACT_APP_PROD}/api/companyInformation/getInfo/${
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
    setOrderBase64PDF(location.state.pdfReport);
  }, [info]);

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
