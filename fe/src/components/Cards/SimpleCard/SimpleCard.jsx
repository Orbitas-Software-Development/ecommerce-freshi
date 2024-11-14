import React from "react";
import { useNavigate } from "react-router-dom";
import { getCustomTheme } from "../../../utils/localStorage/functions";
export default function SimpleCard({
  icono,
  titulo,
  route,
  disabled = false,
  params = {},
}) {
  const navigate = new useNavigate();
  const customTheme = getCustomTheme();
  return (
    <div
      disabled={disabled}
      onClick={() => {
        !disabled && navigate(`/${route}`, params);
      }}
      style={{
        borderColor: customTheme ? customTheme?.primaryColorHex : "black",
        backgroundColor: "white",
      }}
      className={`${
        disabled ? "" : `cursor-pointer  shadow-lg  border-2 `
      }  w-[150px] h-[150px] flex flex-col justify-center items-center p-6 
       bg-white rounded m-4`}
    >
      <div className={`text-center`}>
        <p className={`text-xl font-semibold`}>{titulo}</p>
      </div>
      <div className=" h-full flex justify-center items-center">
        <i
          style={{
            color: customTheme ? customTheme?.primaryColorHex : "black",
          }}
          className={`${icono} brightness-90`}
        ></i>
      </div>
    </div>
  );
}
