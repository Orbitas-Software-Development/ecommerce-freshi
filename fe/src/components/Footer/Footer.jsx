import React from "react";
import { getCustomTheme } from "../../utils/localStorage/functions";
const Footer = () => {
  const customTheme = getCustomTheme();

  return (
    <div
      className="pc:block  movil:hidden sticky pc:z-10"
      style={{
        backgroundColor: customTheme
          ? customTheme?.primaryColorHex
          : "bg-gray-400",
      }}
    >
      <div
        className={`h-[6vh]  before:text-light-inverse text-md/normal font-semibold 
         
       flex justify-center items-center `}
      >
        <p className="text-black ">© {new Date().getFullYear()} Orbitas.</p>
      </div>
    </div>
  );
};

export default Footer;
