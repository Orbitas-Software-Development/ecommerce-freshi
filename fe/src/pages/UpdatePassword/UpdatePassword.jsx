import { React, useState, Fragment } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUserInfo } from "../../utils/localStorage/functions";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { TextButton } from "../../components/Button/Button";
import { faHome, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
export default function UpdatePassword() {
  const [password, setPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    updatePasword();
  }
  async function handleData(e) {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  }

  const updatePasword = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_PROD}/api/cuentas/updateuser`, {
        ...password,
        ["id"]: getUserInfo().id,
        ["companyId"]: getUserInfo().branch.companyId,
        ["branchId"]: getUserInfo().branchId,
      })
      .then((res) => {
        toast("Clave actualizada");
        setLoading(false);
        navigate("/login");
      })
      .catch((e) => {
        toast("No se ha actualizado");
        setLoading(false);
      });
  };
  const navigate = new useNavigate();
  return (
    <Layout>
      <div className="w-full flex flex-col justify-start items-start">
        <ToastContainer position="bottom-center" />{" "}
        <TextButton
          text={"Atras"}
          bgColor={`bg-blue-700`}
          hoverBgColor={`hover:bg-blue-700`}
          hoverTextColor={`hover:text-black`}
          otherProperties="max-w-[120px] mx-4 my-4"
          icon={faHome}
          onClick={(e) => {
            navigate("/login");
          }}
        />
        <div className="w-full">
          <h1 className="mt-4 font-semibold text-3xl text-center">
            Actualización de Contraseña
          </h1>
        </div>
        <form
          className="w-96 mx-auto mt-4 border rounded-md p-8"
          onSubmit={handleSubmit}
        >
          <label
            for="password"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Nueva contraseña
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Dígite su clave"
            required
            name="password"
            onChange={(e) => handleData(e)}
            minLength={6}
          />

          <TextButton
            disabled={loading}
            text={
              loading ? (
                <div className="flex items-center">
                  <Fragment>
                    <p className=" mr-1">Actualizar</p>
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      size="lg"
                      spin={true}
                    />
                  </Fragment>
                </div>
              ) : (
                "Actualizando"
              )
            }
            bgColor={`bg-blue-700`}
            hoverBgColor={`hover:bg-blue-700`}
            hoverTextColor={`hover:text-black`}
            otherProperties="mt-4"
            type="submit"
            onClick={() => {}}
          />
        </form>
      </div>
    </Layout>
  );
}
