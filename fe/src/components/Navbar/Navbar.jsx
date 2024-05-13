import { React, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    try {
      let role = JSON.parse(localStorage.getItem("role"));
      if (role === "admin") {
        return setUserName(JSON.parse(localStorage.getItem("user")).login);
      }
      setUserName(JSON.parse(localStorage.getItem("user")).userName);
    } catch (error) {
      console.log(error);
    }
  });

  const navigate = useNavigate();
  return (
    <nav className="h-[8vh]  sticky top-[0rem] bg-green-700 flex items-center justify-between shadow-sm shadow-gray-900 z-10">
      <div className="flex items-center pl-2">
        <img
          width="110"
          height="90"
          src="/Logo_Freshi.jpg"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </div>
      <div className="flex justify-center items-center">
        <span className="text-primary-50 font-semibold mr-2 text-xl">
          {userName}
        </span>
        <div className="flex justify-center items-center">
          <button
            className="mr-4 ml-4 bg-slate-100 rounded-full  py-2 px-3"
            type="button"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("storeUser");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
