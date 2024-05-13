import React from "react";
import { useNavigate } from "react-router-dom";
export default function EmptyResponse({ message, redirectRoute, addMessage }) {
  //Router
  const navigate = new useNavigate();
  return (
    <div className=" w-full text-center">
      <p className="mt-4  font-semibold text-xl">{message}</p>
      <button
        className="text-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-4 mx-6"
        type="button"
        onClick={(e) => {
          navigate(`/${redirectRoute}`);
        }}
      >
        <>
          {addMessage} <i class="fa-solid fa-plus"></i>
        </>
      </button>
    </div>
  );
}
