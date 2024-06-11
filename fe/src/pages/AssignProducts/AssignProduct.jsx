import { React, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/localStorage/functions";
import { getCurrencySimbol } from "../../utils/Currency/currencyFunctions";
import { NumericFormat } from "react-number-format";
import { priceListDto } from "../../utils/DTOs/priceListProcuct";
import { updateAssignedProduct } from "../../utils/Functions/pages/assignProductFunctions";
import axios from "axios";
import SimpleModal from "../../components/Modals/SimpleModal";
import Table from "../../components/Tables/Table/Table";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../utils/http/functions";
import EmptyResponse from "../../components/EmptyResponse/EmptyResponse";
export default function AssignProduct() {
  //localstorage
  const user = getUserInfo();
  //navigate
  const navigate = useNavigate();
  const location = useLocation();
  //local
  const [products, setProduct] = useState([]);
  //modal
  const [modalData, setModalData] = useState(false);
  const active = (id) => {
    let newProduct = products.map((product) => {
      if (product.id == id) {
        product.active = !product?.active;
        product.price = "";
      }
      return product;
    });
    setProduct(newProduct);
  };
  const assignPrice = (id, price) => {
    let newProductList = products.map((product) => {
      if (product.id == id) {
        product.price = price;
        return product;
      }
      return product;
    });
    setProduct(newProductList);
  };
  const handleSubmit = async () => {
    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });
    await axios
      .post(
        `${process.env.REACT_APP_PROD}/api/PricelistProduct/createPricelistProduct/${location.state.id}`,
        priceListDto(location.state, products)
      )
      .then((res) => {
        setProduct(updateAssignedProduct(products, res.data));
        okResponseModalHandle({
          setModalData,
          time: 1000,
          message: "Guardado",
        });
      })
      .catch((e) => {
        errorResponseModalHandle({
          route: "/priceList",
          navigate: navigate,
          setModalData,
        });
      });
  };
  useEffect(() => {
    setModalData({
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    axios
      .get(
        `${process.env.REACT_APP_PROD}/api/product/getProductsByCompanyId/${user.companyId}`
      )
      .then((res) => {
        let products = res.data;
        setProduct(products);
        axios
          .get(
            `${process.env.REACT_APP_PROD}/api/PricelistProduct/getPricelistProductByPriceListId/${location.state.id}`
          )
          .then((res) => {
            setProduct(updateAssignedProduct(products, res.data));
            setModalData({
              loading: false,
            });
          })
          .catch((e) => {
            errorResponseModalHandle({
              route: "/priceList",
              navigate: navigate,
              setModalData,
            });
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const columns = [
    { center: true, name: "Nombre", selector: (row) => row.name },
    {
      center: true,
      name: "Unidades por caja",
      selector: (row) => row.unitsPerBox,
    },
    {
      name: "Descripción",
      center: true,
      wrap: true,
      selector: (row) => row.description,
    },
    {
      name: "Imagen",
      center: true,
      cell: (product) => (
        <img
          className="object-cover bg-center rounded-lg border m-1"
          src={`data:image/png;base64,${product.base64Image}`}
          alt="product photo"
          width={"150px"}
        />
      ),
    },
    {
      name: "Agregar",
      center: true,
      cell: (product) => (
        <label class="inline-flex items-center cursor-pointer ">
          <input
            name={product.name}
            type="checkbox"
            checked={product?.active ? true : false}
            class="sr-only peer ml-1"
            onChange={(e) => {
              active(product.id);
            }}
          />
          <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Agregar producto
          </span>
        </label>
      ),
    },
    {
      name: "Precio",
      center: true,
      cell: (product) => (
        <NumericFormat
          required
          id={product.id}
          disabled={product?.active ? false : true}
          autofocus={product?.active ? false : true}
          className="w-[300px]  m-1 bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:enabled:bg-gray-200"
          placeholder="Ingrese el precio"
          onChange={(e) => {
            assignPrice(product.id, e.target.value);
          }}
          value={product?.price}
          min={1}
          thousandSeparator=","
          decimalScale={2}
          prefix={getCurrencySimbol(location.state.currencyId)}
        />
      ),
    },
  ];
  return (
    <Layout>
      <SimpleModal data={modalData} />
      <div className="w-full flex flex-col justify-start items-start p-5">
        <button
          class="text-white w-[100px] text-lg m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            navigate("/priceList");
          }}
        >
          Atras
        </button>
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Agregar Productos a {location.state.name}
          </h1>
        </div>
        {products.length > 0 ? (
          <>
            <div className="border rounded-md w-full">
              <Table columns={columns} data={products} />
              <div className="w-full text-center border-t py-4">
                <button
                  type="submit"
                  className="w-[300px]  text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => {
                    handleSubmit();
                  }}
                >
                  Guardar
                </button>
              </div>
            </div>
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
