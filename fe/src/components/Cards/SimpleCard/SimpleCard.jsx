import React from "react";
import { useNavigate } from "react-router-dom";
export default function SimpleCard({
  icono,
  titulo,
  route,
  disabled = false,
  params = {},
}) {
  const navigate = new useNavigate();
  return (
    <div
      onClick={() => {
        !disabled && navigate(`/${route}`, params);
      }}
      className={`${
        disabled ? "" : "cursor-pointer shadow"
      }  w-[150px] h-[150px] flex flex-col justify-center items-center p-6 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 m-4`}
    >
      <div className="text-center">
        <p className="text-xl font-semibold">{titulo}</p>
      </div>
      <div className=" h-full flex justify-center  items-center">
        <i className={`${icono}`}></i>
      </div>
    </div>
  );
}
