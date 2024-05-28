import { React, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/localStorage/functions";
import axios from "axios";
export default function AssignProduct() {
  //localstorage
  const user = getUserInfo();
  //navigate
  const navigate = useNavigate();
  //local
  const [products, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_DEV}/api/product/getProductsByCompanyId/${user.companyId}`
      )
      .then((res) => {
        setProduct(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Layout>
      <div className="w-full flex flex-col justify-start items-start">
        <button
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/priceList");
          }}
        >
          Atras
        </button>
        <div className="w-full h-full  flex ">
          <div className="flex-1  p-3 border rounded-md m-4">
            Productos
            <div className="flex flex-col">
              {products.map((value) => (
                <div className="border m-2 p-2 rounded-sm active:bg-blue-700 focus:bg-blue-700 ">
                  <div className="">{value.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div className=" h-full flex justify-center items-center flex-col">
            <button
              type="submit"
              className=" mb-2 text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              &gt;
            </button>
            <button
              type="submit"
              className=" text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              &lt;
            </button>
          </div>
          <div className="flex-1  border rounded-md m-4 p-3">
            Lista de precios
          </div>
        </div>
        <div className="w-full  text-center mb-2">
          <button
            type="submit"
            className="w-[300px] text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Guardar
          </button>
        </div>
      </div>
    </Layout>
  );
}
