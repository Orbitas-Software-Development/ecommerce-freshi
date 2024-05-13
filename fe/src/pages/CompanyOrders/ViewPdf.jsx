import React from "react";
import { generatePDF } from "../../utils/reports/generateOrderClient";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { useLocation, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
export default function ViewPdf() {
  const location = useLocation();
  const data = location.state;
  let pdf = generatePDF(data);
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
          src={pdf.format + "," + pdf.base64}
          frameborder="0"
          width="100%"
          height="90%"
        ></iframe>
      </div>
    </Layout>
  );
}
