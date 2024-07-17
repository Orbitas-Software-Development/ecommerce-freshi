import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import {
  saveUserInfo,
  getUserInfo,
  saveCompanyLogoBase64,
} from "../../utils/localStorage/functions";
import { getBase64ImageFromUrl } from "../../utils/Images/images";
import "./bg.css";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import axios from "axios";

import TodayGreeting from "../../components/TodayGreeting/TodayGreeting";
const Login = () => {
  //local
  const [userCredentials, setUserCredentials] = useState({});
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
        saveUserInfo(res.data);
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
      className="box "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="layout flex justify-center flex-col items-center h-[100vh]">
        <form
          onSubmit={handleLogin}
          className="mt-2 backdrop-blur-3xl  shadow-md shadow-gray-800 rounded-xl px-8 pt-6 pb-8  flex flex-col desktop:min-w-[30%] laptop:min-w-[50%] tablet:min-w-[80%] phone:min-w-[80%]"
        >
          {" "}
          <TodayGreeting />
          <div className="m-4 flex justify-center items-center flex-col">
            {" "}
            <motion.div
              className="box mb-3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.1,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              {userLocalStorage && (
                <img
                  src={
                    userLocalStorage?.branch?.client?.company
                      ?.pictureBusinessName
                  }
                  width="100"
                  alt=""
                />
              )}
            </motion.div>{" "}
          </div>{" "}
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Compañia
          </label>{" "}
          <div className="mb-4">
            <select
              required
              id="countries"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker text-lg "
              name="company"
              onChange={handleData}
            >
              <option selected value="">
                ESCOJA UNA COMPAÑIA
              </option>
              <option value={13}>JADE</option>
              <option value={12}>FRESHI</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-lg font-bold mb-2"
              htmlFor="userName"
            >
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker text-lg "
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
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 text-lg "
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
            <button
              onSubmit={handleLogin}
              className="text-lg mt-4 bg-green-600 hover:bg-blue-dark text-white font-bold py-2 px-4 mb-2 rounded w-[200px] text-center"
              type="submit"
              disabled={loading ? true : false}
            >
              {loading ? <Loading /> : "Ingresar"}
            </button>
            <a
              className="inline-block align-baseline text-black  font-bold text-lg  text-blue hover:text-blue-darker"
              href="#"
            >
              he olvidado la contraseña
            </a>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
