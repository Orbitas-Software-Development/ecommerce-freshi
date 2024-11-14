import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MotionGesture from "../Motion/MotionGesture/MotionGesture";
import { getCustomTheme } from "../../utils/localStorage/functions";
export default function TextButton({
  bgColor = "",
  hoverBgColor = "",
  text,
  textColor = "text-white",
  hoverTextColor = "hover:text-[#C2AE4A]",
  textSize = "text-lg",
  type = "button",
  width = "w-[300px]",
  otherProperties = "",
  onClick = () => alert("onClick"),
  onChange = () => alert("No onChange"),
  disabled = false,
  icon,
}) {
  const customTheme = getCustomTheme();
  return (
    <MotionGesture>
      <button
        className={`${otherProperties} ${bgColor} ${hoverBgColor}  ${textSize}  ${textColor} ${hoverTextColor} ${width} pc:text-lg movil:text-sm shadow-md  rounded-sm w-full py-2 px-3  hover:brightness-90`}
        type={type}
        disabled={disabled}
        autoComplete="off"
        onChange={onChange}
        onClick={onClick}
        style={{ backgroundColor: !bgColor && customTheme?.primaryColorHex }}
      >
        {text}
        <FontAwesomeIcon
          icon={icon}
          className="ml-2  movil:text-sm pc:text-lg"
        />
      </button>
    </MotionGesture>
  );
}
