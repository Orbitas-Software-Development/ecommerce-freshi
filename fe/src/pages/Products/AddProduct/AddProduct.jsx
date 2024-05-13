import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";
export default function AddProduct() {
  //localStorage
  const user = getUserInfo();
  //Route
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  //local
  const [product, setProduct] = useState({});
  const [iva, setIva] = useState([]);
  const [category, setCategory] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [priceList, setPriceList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let productDTO = product;
    productDTO.companyId = user.companyId;
    axios
      .post(`https://localhost:7065/api/product/createProduct`, productDTO)
      .then((res) => {
        navigate("/products");
      });
  };
  const handleData = (e) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    var file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }

      setProduct({
        ...product,
        ["base64Image"]: encoded,
      });
    };
  };

  useEffect(() => {
    data && setProduct(data);
    axios
      .get(
        `https://localhost:7065/api/category/getCategoryByCompany/${user.companyId}`
      )
      .then((res) => {
        setCategory(res.data);
        axios
          .get(
            `https://localhost:7065/api/iva/getIvaByCompanyId/${user.companyId}`
          )
          .then((res) => {
            setIva(res.data);
            axios
              .get(`https://localhost:7065/api/currency/getCompanyCurrency`)
              .then((res) => {
                setCurrencies(res.data);
                axios
                  .get(
                    `https://localhost:7065/getListPriceByCompanyId/${user.company.id}`
                  )
                  .then((res) => {
                    setPriceList(res.data);
                  });
              });
          });
      });
  }, []);

  return (
    <Layout>
      <div className="flex flex-row justify-start items-start">
        <button
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/products");
          }}
        >
          Atras
        </button>
      </div>
      <div className="w-full flex flex-row justify-center items-start">
        <div>
          <div className="w-full">
            <h1 className="mt-4 font-semibold text-3xl text-center">
              Producto
            </h1>
          </div>{" "}
          <form
            class="mx-auto mt-4 border rounded-md p-8"
            onSubmit={handleSubmit}
          >
            <div class="mb-5">
              <label
                for="description"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Descripción
              </label>
              <input
                type="text"
                id="description"
                class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digíte descripción"
                required
                name="description"
                value={product?.description || ""}
                onChange={(e) => handleData(e)}
                autoComplete="false"
              />
              <label
                for="code"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Código
              </label>
              <input
                type="text"
                id="code"
                class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digíte código"
                required
                name="code"
                value={product?.code || ""}
                onChange={(e) => handleData(e)}
                autoComplete="false"
              />
              <label
                for="base64Image"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Imagen
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="base64Image"
                class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Imagen"
                required
                name="base64Image"
                onChange={(e) => handleImage(e)}
                autoComplete="false"
              />
              <label
                for="unitsPerBox"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Unidades por cajas
              </label>
              <input
                type="number"
                id="unitsPerBox"
                class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digíte unidades por cajas"
                required
                name="unitsPerBox"
                value={product?.unitsPerBox || ""}
                onChange={(e) => handleData(e)}
                autoComplete="false"
              />
              <label
                for="unitWeight"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Peso
              </label>
              <input
                type="text"
                id="number"
                class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digíte peso"
                required
                name="unitWeight"
                value={product?.unitWeight || ""}
                onChange={(e) => handleData(e)}
                autoComplete="false"
              />
              <label
                for="category"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Categoria
              </label>
              <select
                id="category"
                type="number"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="categoryId"
                onChange={(e) => {
                  e.target.value !== "" && handleData(e);
                }}
              >
                <option value="">Seleccione Categoria</option>
                {category.map((value, index) =>
                  value.id == product.categoryId ? (
                    <option key={index} value={value.id} selected>
                      {value.name}
                    </option>
                  ) : (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  )
                )}
              </select>{" "}
              <label
                for="iva"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Iva
              </label>
              <select
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="ivaId"
                onChange={(e) => {
                  e.target.value !== "" && handleData(e);
                }}
              >
                <option value="">Seleccione iva</option>
                {iva.map((value, index) =>
                  value.id == product.ivaId ? (
                    <option key={index} value={value.id} selected>
                      {value.name}
                    </option>
                  ) : (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  )
                )}
              </select>
              <label
                for="currency"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Moneda
              </label>
              <select
                id="currency"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="currencyId"
                onChange={(e) => {
                  e.target.value !== "" && handleData(e);
                }}
              >
                <option value="">Seleccione Moneda</option>
                {currencies.map((value, index) =>
                  value.id == product.currencyId ? (
                    <option key={index} value={value.id} selected>
                      {value.name}
                    </option>
                  ) : (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  )
                )}
              </select>
              <label
                for="currency"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Lista
              </label>
              <select
                id="priceList"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="priceListId"
                onChange={(e) => {
                  e.target.value !== "" && handleData(e);
                }}
              >
                <option value="">Seleccione Lista de precios</option>
                {priceList.map((value, index) => (
                  <option key={index} value={value.priceListId}>
                    {value.name}
                  </option>
                ))}
              </select>{" "}
              <label
                for="price"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Precio
              </label>
              <input
                type="price"
                id="price"
                class="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digíte precio"
                required
                name="price"
                value={product?.price || ""}
                onChange={(e) => handleData(e)}
                autoComplete="false"
              />
            </div>
            <button
              type="submit"
              class="text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar
            </button>
          </form>
        </div>{" "}
        <div className="h-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">Imagen</h1>
          <div className="h-full flex justify-center items-start mt-4 ml-2">
            <img
              className="object-contain rounded border border-solid p-2"
              src={`data:image/png;base64,${product.base64Image}`}
              alt="product photo"
              width={"200px"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
