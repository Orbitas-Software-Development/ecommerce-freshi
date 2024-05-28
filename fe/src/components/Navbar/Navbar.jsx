import { React, useEffect, useState } from "react";
import { getUserInfo, getName } from "../../utils/localStorage/functions";
import { useNavigate } from "react-router-dom";
import TodayGreeting from "../TodayGreeting/TodayGreeting";

const Navbar = () => {
  const userLocalStorage = getUserInfo();
  console.log(getName());
  const getNavImage = () => {
    if (userLocalStorage?.branch) {
      return userLocalStorage?.branch?.client?.company?.pictureBusinessName;
    }
    return userLocalStorage?.company?.pictureBusinessName;
  };
  const navigate = useNavigate();
  return (
    <nav className="h-[8vh]  sticky top-[0rem] bg-green-700 flex items-center justify-between shadow-sm shadow-gray-900 z-10">
      <div className="flex items-center pl-2">
        {userLocalStorage && <img src={getNavImage()} width="100" alt="" />}
      </div>
      <div className="flex justify-center items-center">
        <span className="text-primary-50 mr-2 text-lg  flex justify-center items-center">
          Hola
        </span>
        <span className="text-primary-50 mr-2 text-lg  flex justify-center items-center">
          <b>{getName()}</b>,
        </span>
        <span className="text-primary-50 mr-2 text-lg  flex justify-center items-center">
          <TodayGreeting />
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
