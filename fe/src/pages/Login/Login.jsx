import { useNavigate } from "react-router-dom";
import { React, useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setUserInfo,
  getUserInfo,
  saveCompanyLogoBase64,
  getCompanyLogo,
  getCustomTheme,
} from "../../utils/localStorage/functions";
import { getBase64ImageFromUrl } from "../../utils/Images/images";
import "./bg.css";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import TextButton from "../../components/Button/TextButton";
import axios from "axios";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
const customTheme = getCustomTheme();
const Login = () => {
  const [userCredentials, setUserCredentials] = useState({ companyId: 38 });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  //LocalStorage
  const userLocalStorage = getUserInfo();
  function handleData(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }
  const getImageByCompany = async (response) => {
    try {
      if (response?.user.branch) {
        await getBase64ImageFromUrl(
          response.user.branch.client.company.pictureBusinessName
        ).then((img) => {
          console.log(img);
          saveCompanyLogoBase64(img);
        });
      }
      await getBase64ImageFromUrl(
        response.user.company.pictureBusinessName
      ).then((img) => {
        console.log(img);
        saveCompanyLogoBase64(img);
      });
    } catch (e) {
      console.log(e);
    }
  };

  var redirectByRole = (res) => {
    res.data.role === "client"
      ? res.data.user.emailConfirmed
        ? navigate("/home")
        : navigate("/updatepassword")
      : navigate("/admindashboard");
    window.location.reload();
  };
  let navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_PROD}/login`, userCredentials)
      .then(async (res) => {
        setLoading(false);
        setUserInfo(res.data);
        await getImageByCompany(res.data);
        redirectByRole(res);
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage("Correo o contraseña incorrecta");
        setLoading(false);
      });
  };
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg flex flex-row justify-center items-center h-[100vh]">
        <div className="flex flex-row  justify-center items-center pc:w-[45%] movil:w-[95%] backdrop-blur-3xl  shadow-md shadow-gray-800 rounded-sm p-5">
          <div className="flex-1 pc:flex pc:flex-col items-center justify-center h-[500px] bg-login-img rounded-sm  movil:hidden">
            {userLocalStorage && (
              <img
                className="pc:block movil:hidden"
                src={"Logo_Freshi.jpg"}
                width="250"
                alt=""
              />
            )}
          </div>

          <form onSubmit={handleLogin} className="flex flex-col flex-1 ml-5">
            <div className="m-4 flex justify-center items-center flex-col"></div>
            <div className="mb-4">
              {/*logos animations*/}
              <div className=" flex flex-row items-center ">
                <div className="tranform-down-up">
                  <img src="orbitas_logo.png" alt="orbitas-log" width={100} />
                </div>
                <div className="ml-3 my-2 tranform-up-down">
                  <img width={35} src="./logo-orion.png" alt="" />
                </div>
              </div>
              <p className="text-3xl mb-2 font-extrabold">Bienvenido a ORION</p>
              <p className="text-xl mb-4 font-sans">
                Administra tu inventario y maximiza tus ventas con <b>ORION</b>
              </p>
              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="userName"
              >
                Usuario
              </label>
              <input
                className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-grey-darker text-lg "
                id="userName"
                type="text"
                name="userName"
                placeholder="Usuario"
                onChange={handleData}
                required
                autoComplete="off"
              ></input>
            </div>
            <div className="mb-6">
              <label
                className="block text-black  text-lg font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow appearance-none border border-red rounded-sm w-full py-2 px-3 text-grey-darker mb-3 text-lg "
                id="password"
                type="password"
                name="password"
                placeholder="******"
                onChange={handleData}
                required
                minLength={4}
              ></input>
              <p className="text-red-700 text-lg  italic">{errorMessage}</p>
            </div>
            <div className="flex items-center flex-col ">
              <div className="mb-4">
                <TextButton
                  text={
                    loading ? (
                      <div className="flex items-center">
                        <Fragment>
                          <p className=" mr-1">Ingresando</p>
                          <FontAwesomeIcon
                            icon={faCircleNotch}
                            size="lg"
                            spin={true}
                          />
                        </Fragment>
                      </div>
                    ) : (
                      "Ingresar"
                    )
                  }
                  hoverTextColor={"hover:text-white"}
                  style={{ backgroundColor: customTheme?.primaryColorHex }}
                  textColor={"text-white"}
                  disabled={loading}
                  type={"submit"}
                  onClick={() => {}}
                />
              </div>
            </div>
            {/*recuperar contraseña*/}
            <div className="text-center">
              <p className="flex flex-col">¿Has olvidado tu contraseña?</p>
              <a
                className="inline-block align-baseline text-black  font-bold   text-blue hover:text-blue-darker"
                href="#"
              >
                Presione aquí
              </a>
            </div>
            {/*version*/}
            <div className="left-3 bottom-3 absolute  p-1 ">
              <p className="font-semibold  ">
                Versión:{" "}
                <span
                  style={{ backgroundColor: customTheme?.primaryColorHex }}
                  className="  rounded p-1"
                >
                  1.0
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
