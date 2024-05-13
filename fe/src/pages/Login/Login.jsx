import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import { saveUserInfo } from "../../utils/localStorage/functions";
import "./bg.css";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
const Login = () => {
  //local
  const [userCredentials, setUserCredentials] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleData(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }
  var redirectByRole = (res) => {
    res.data.role === "client"
      ? res.data.user.emailConfirmed
        ? navigate("/home")
        : navigate("/updatepassword")
      : navigate("/admindashboard");
  };
  let navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://localhost:7065/login", userCredentials)
      .then((res) => {
        setLoading(false);
        saveUserInfo(res.data);
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
          <div className="m-4 flex justify-center items-center flex-col">
            <motion.div
              className="box"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.1,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <img src="/Logo_Freshi.jpg" width="140" height="140" alt="" />
            </motion.div>
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
            ></input>
            <p className="text-red-700 text-lg  italic">{errorMessage}</p>
          </div>
          <div className="flex items-center flex-col ">
            <button
              onSubmit={handleLogin}
              className="text-lg mt-4 bg-green-600 hover:bg-blue-dark text-white font-bold py-2 px-4 mb-2 rounded w-[200px] text-center"
              type="submit"
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
