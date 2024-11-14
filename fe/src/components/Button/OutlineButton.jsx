import React from "react";

export default function OutlineButton({
  bgColor = "bg-white",
  outlineColor = "outline-black",
  hoverOutlineColor = "hover:outline-gray-900",
  text,
  textColor = "black",
  hoverTextColor = "hover:text-[#C2AE4A]",
  textSize = "text-lg",
  type = "button",
  width = "w-[300px]",
  otherProperties = "",
  onClick = () => alert("onClick"),
  onChange = () => alert("No onChange"),
  disabled = false,
}) {
  return (
    <button
      className={`${otherProperties} ${textSize} ${bgColor} ${outlineColor} ${hoverOutlineColor}  ${textColor}  ${hoverTextColor} ${width}  rounded-[0.01px] w-full py-1 px-2  outline-2 outline-offset-2 outline`}
      type={type}
      disabled={disabled}
      autoComplete="off"
      onChange={onChange}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
