import React from "react";
import { useNavigate } from "react-router-dom";
export default function RedirectButton({
  message,
  redirect,
  actionMessage,
  state = {},
}) {
  //route
  const navigate = new useNavigate();
  return (
    <>
      <p className="text-red-500 text-sm">{message}</p>
      <button
        onClick={(e) => {
          navigate(`${redirect}`, { state: state });
        }}
        className="text-white  text-sm  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center "
      >
        {actionMessage}
      </button>
    </>
  );
}
