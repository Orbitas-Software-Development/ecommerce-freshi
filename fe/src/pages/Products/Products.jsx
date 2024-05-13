import { React, useState, useEffect } from "react";
import axios from "axios";
import { getUserInfo } from "../../utils/localStorage/functions";
import { useNavigate } from "react-router-dom";
import MicroModal from "react-micro-modal";
import Layout from "../../components/Layout/Layout";
import productStore from "../../stores/productStore";
import EmptyResponse from "../../components/EmptyResponse/EmptyResponse";
import Table from "../../components/Tables/Table/Table";
export default function Products() {
  //global
  const products = productStore((state) => state.products);
  const setProducts = productStore((state) => state.setProducts);
  //local
  const [priceList, setPriceList] = useState([]);
  //localSotrage
  const user = getUserInfo();
  //Route
  const navigate = useNavigate();

  const getProductsByListId = (e) => {
    if (e.target.value) {
      return axios
        .get(
          `https://localhost:7065/api/product/getProductsByCompanyId/${user.companyId}`
        )
        .then((res) => {
          setProducts(res.data);
        });
    }
    axios
      .get(
        `https://localhost:7065/api/product/getProductsByListId/${e.target.value}`
      )
      .then((res) => {
        setProducts(res.data);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://localhost:7065/api/product/getProductsByCompanyId/${user.companyId}`
      )
      .then((res) => {
        setProducts(res.data);
        axios
          .get(
            `https://localhost:7065/getListPriceByCompanyId/${user.company.id}`
          )
          .then((res) => {
            setPriceList(res.data);
          });
      });
  }, []);
  const deleteProductId = (id) => {
    axios
      .delete(`https://localhost:7065/api/product/deleteProductBy/${id}`)
      .then((res) => {
        setProducts(res.data);
      });
  };
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Nombre",
      selector: (row) => row.description,
    },
    {
      name: "Código",
      selector: (row) => row.code,
    },

    {
      name: "Unidades por caja",
      selector: (row) => row.unitsPerBox,
    },
    {
      name: "Peso",
      selector: (row) => row.unitWeight,
    },
    {
      name: "Categoría",
      selector: (row) => row.category.name,
    },
    {
      name: "IVA",
      selector: (row) => row.iva.name,
    },
    {
      name: "Moneda",
      selector: (row) => row.currency.name,
    },
    {
      name: "Editar",
      cell: (row) => (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={(e) => navigate("/productform", { state: row })}
        >
          Editar
        </button>
      ),
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={(e) => deleteProductId(row.id)}
        >
          Eliminar
        </button>
      ),
    },
  ];
  return (
    <Layout>
      <div className="w-full flex flex-col justify-start items-start">
        <button
          type="submit"
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/admindashboard");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">Productos</h1>
        </div>
        {products.length > 0 ? (
          <>
            <div className="">
              <button
                className="text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6  text-lg"
                type="button"
                onClick={(e) => {
                  navigate("/productform");
                }}
              >
                Agregar Producto <i class="fa-solid fa-plus"></i>
              </button>

              <select
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-2 mx-6"
                name="priceListId"
                onChange={(e) => {
                  e.target.value !== "" && getProductsByListId(e);
                }}
              >
                <option value="">Seleccione Lista de precios</option>{" "}
                <option value="all" selected>
                  Todas
                </option>
                {priceList.map((value, index) => (
                  <option key={index} value={value.priceListId}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
            <Table columns={columns} data={products} />
          </>
        ) : (
          <EmptyResponse
            message={"No hay productos registrados"}
            redirectRoute={"productform"}
            addMessage={"Agregar Producto"}
          />
        )}
      </div>
    </Layout>
  );
}
