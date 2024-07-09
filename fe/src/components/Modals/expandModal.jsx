import { React, useState } from "react";
import "./style.css";
import logo from "../../assets/rocket-boy-26.png";
export default function expandModal({
  title,
  subtitle,
  openExpandedModal,
  setOpenExpandedModal,
  child,
}) {
  return (
    <div
      className={` main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster   ${
        openExpandedModal ? "block" : "hidden"
      }`}
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      <div className="pc:w-[50%] movil:w-[100%] border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <div>
              <p className="text-2xl font-bold">{title}</p>{" "}
            </div>

            <div className="modal-close cursor-pointer z-50">
              <svg
                onClick={() => {
                  setOpenExpandedModal(!openExpandedModal);
                }}
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          <div className="pt-2 text-center">
            <div>
              <p className="text-2xl font-bold">{subtitle}</p>
            </div>
            <div className="flex justify-center items-center">
              <img
                className="pc:w-[250px] movil:w-[200px]"
                src={logo}
                alt="Logo"
                height={"auto"}
              />
            </div>
            {child()}
            <button
              onClick={() => {
                setOpenExpandedModal(!openExpandedModal);
              }}
              className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
            >
              ok
            </button>
            {/* <button
              onClick={() => {
                openExpandedModal();
              }}
              className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400"
            >
              Confirm
            </button>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
