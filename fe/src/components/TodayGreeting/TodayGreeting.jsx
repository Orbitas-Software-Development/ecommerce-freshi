import React from "react";

export default function TodayGreeting() {
  //getHour
  const hour = new Date().getHours();
  return (
    <div className="text-end flex flex-row justify-center items-center">
      {hour < 12 ? (
        <>
          <span className="font-thin pc:block movil:hidden">¡Buenos Días!</span>
          <i class="fa-solid fa-mug-saucer fa-xl"></i>
        </>
      ) : hour < 18 ? (
        <>
          <span className="font-thin pc:block movil:hidden">
            ¡Buenas Tardes!
          </span>
          <i class="fa-regular fa-sun  fa-xl"></i>
        </>
      ) : (
        <>
          <span className="font-thin"> </span>{" "}
          <i class="fa-regular fa-moon fa-2xl"></i>
        </>
      )}
    </div>
  );
}
