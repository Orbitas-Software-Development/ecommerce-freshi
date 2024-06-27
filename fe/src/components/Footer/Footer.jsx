import React from "react";

const Footer = () => {
  return (
    <div className="pc:block  movil:hidden">
      <div className=" h-[6vh]  before:text-light-inverse text-md/normal font-semibold bg-green-700 flex justify-center items-center sticky z-10 ">
        <p className="text-black ">© {new Date().getFullYear()} Orbitas.</p>
      </div>
    </div>
  );
};

export default Footer;
