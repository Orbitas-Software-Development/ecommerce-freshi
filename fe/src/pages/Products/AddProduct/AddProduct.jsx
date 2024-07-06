import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { getUserInfo } from "../../../utils/localStorage/functions";

import SimpleModal from "../../../components/Modals/SimpleModal";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../../utils/http/functions";
import RedirectButton from "../../../components/Buttons/RedirectButton/RedirectButton";
import productStore from "../../../stores/productStore";
import { validateExistedValue } from "../../../utils/utils";
export default function AddProduct() {
  //localStorage
  const user = getUserInfo();
  //Route
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  //global
  const products = productStore((state) => state.products);
  //local
  const [product, setProduct] = useState({});
  const [iva, setIva] = useState([]);
  const [categories, setCategory] = useState([]);
  const [imageError, setImageError] = useState(false);
  //close modal
  const [modalData, setModalData] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product?.id && validateExistedValue(products, product.name, "name")) {
      return errorResponseModalHandle({
        loading: true,
        message: <>{`La sucursal: ${branch.name}, ya existe`}</>,
        modalIcon: "info",
        setModalData: setModalData,
      });
    }
    setModalData({
      loading: true,
      text: <>Procesando</>,
      icon: "loading",
    });

    product.companyId = user.companyId;
    product.currencyId = 1;
    product?.id
      ? axios
          .put(
            `${process.env.REACT_APP_PROD}/api/product/UpdateProduct`,
            product
          )
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/products",
              navigate: navigate,
              message: "Actualizado",
            });
          })
          .catch((e) => {
            console.log(e);
            errorResponseModalHandle({
              setModalData,
              route: "/products",
              navigate: navigate,
            });
          })
      : axios
          .post(
            `${process.env.REACT_APP_PROD}/api/product/createProduct`,
            product
          )
          .then((res) => {
            okResponseModalHandle({
              setModalData,
              route: "/products",
              navigate: navigate,
            });
          })
          .catch((e) => {
            console.log(e);
            errorResponseModalHandle({
              setModalData,
              route: "/products",
              navigate: navigate,
            });
          });
  };
  const handleData = (e) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    console.log("handleimage");
    var file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageError(false);
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      let image = new Image();
      image.src = reader.result.toString();
      image.onload = function () {
        this.height;
        this.width;
        if (this.height > this.width) {
          setImageError(true);
          document.getElementById("base64Image").value = "";
        }
      };

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
        `${process.env.REACT_APP_PROD}/api/category/getCategoryByCompany/${user.companyId}`
      )
      .then((res) => {
        setCategory(res.data);
        axios
          .get(
            `${process.env.REACT_APP_PROD}/api/iva/getIvaByCompanyId/${user.companyId}`
          )
          .then((res) => {
            setIva(res.data);
          });
      });
  }, []);

  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start">
        <button
          className="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/products");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">Producto</h1>
        </div>
        <form
          className="pc:w-[50%] movil:w-[100%]  mx-auto my-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            {" "}
            <label
              for="name"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digíte nombre"
              required
              name="name"
              value={product?.name || ""}
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <label
              for="description"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Descripción
            </label>
            <textarea
              type="text"
              id="description"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digíte descripción"
              required
              name="description"
              value={product?.description || ""}
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <label
              for="code"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Código
            </label>
            <input
              type="text"
              id="code"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digíte código"
              required
              name="code"
              value={product?.code || ""}
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <label
              for="base64Image"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Imagen
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="base64Image"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              placeholder="Imagen"
              required={!product.id || imageError} //requerido si no se esta editando producto o sino tiene errores
              name="base64Image"
              onChange={(e) => handleImage(e)}
              autoComplete="off"
            />
            {product?.base64Image && !imageError ? (
              <div className={`flex justify-center items-center my-4 ml-2 `}>
                <div
                  className={`flex justify-center items-center ${
                    imageError ? "border-red-400" : "border-green-400"
                  } border-4 rounded border-solid  min-w-[300px] min-h-[300px] max-h-[300px]  max-w-[300px]`}
                >
                  <img
                    className="object-cover bg-center rounded-sm"
                    src={
                      !imageError &&
                      `data:image/png;base64,${product.base64Image}`
                    }
                    alt="product photo"
                    width={"300px"}
                    height={"300px"}
                    onChange={(e) => {
                      console.log(e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center  flex-col my-4 ml-2 ">
                <div
                  className={`flex justify-center items-center ${
                    imageError ? "border-red-400" : "border-green-400"
                  } border-4 rounded border-solid  min-w-[300px] min-h-[300px] max-h-[300px]  max-w-[300px] `}
                >
                  Imagen
                </div>
                {imageError && (
                  <label className="mb-1  text-red-400">
                    La imagen debe ser proporcionalmente igual en sus
                    dimenciones o ser el ancho mayor que el largo. Ejemplo:
                    300x300, 800x800, 400x300, 800x500
                  </label>
                )}
              </div>
            )}
            <label
              for="unitsPerBox"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Unidades por cajas
            </label>
            <input
              type="number"
              id="unitsPerBox"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digíte unidades por cajas"
              required
              name="unitsPerBox"
              value={product?.unitsPerBox || ""}
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <label
              for="unitWeight"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Peso Unitario
            </label>
            <input
              type="text"
              id="number"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digíte peso"
              required
              name="unitWeight"
              value={product?.unitWeight || ""}
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
            <label
              for="category"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
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
              {categories.map((value, index) =>
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
            {categories.length === 0 && (
              <>
                <div className="w-full">
                  <RedirectButton
                    message={"No hay categorias Registrados"}
                    redirect={"/categoryForm"}
                    actionMessage={"Registar categoria"}
                  />
                </div>
              </>
            )}
            <label
              for="iva"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
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
            {iva.length === 0 && (
              <>
                <div className="w-full">
                  <RedirectButton
                    message={"No hay IVA Registrado"}
                    redirect={"/addIva"}
                    actionMessage={"Registar IVA"}
                  />
                </div>
              </>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="min-w-[200px] text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
