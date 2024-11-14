import { React } from "react";
import {
  getUserInfo,
  getName,
  getCompanyLogo,
  getCustomTheme,
  getClientLogo,
  getRole,
} from "../../utils/localStorage/functions";
import { useNavigate } from "react-router-dom";
import TodayGreeting from "../TodayGreeting/TodayGreeting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import MotionGesture from "../Motion/MotionGesture/MotionGesture";
//import OrderNotification from "../../pages/OrderNotification/OrderNotification";
const Navbar = () => {
  //user localhost
  const user = getUserInfo();
  const customTheme = getCustomTheme();
  const navigate = useNavigate();
  return (
    <nav
      style={{
        backgroundColor: customTheme
          ? customTheme?.primaryColorHex
          : "bg-gray-400",
      }}
      className={`pc:h-[8vh] movil:h-[10.5vh] sticky top-[0rem]  flex items-center justify-between shadow-md shadow-gray-400 z-10`}
    >
      <div className="flex items-center pl-2">
        {user && <img src={"Logo_Freshi.jpg"} width="100" alt="" />}
        {user && (
          <img
            className="ml-5 "
            src={`data:image/png;base64,${getClientLogo()}`}
            width="100"
            alt=""
          />
        )}
      </div>
      <div className="flex justify-center items-center">
        <span className="text-primary-50 m-2 pc:text-lg  flex justify-center items-center pc:block movil:hidden">
          <b className="w-full">{getName()}</b>
        </span>
        <span className="text-primary-50 mr-4 pc:text-lg  flex justify-center items-center pc:block movil:hidden">
          <TodayGreeting />
        </span>
        <div className="mr-4">
          {/*getRole() === "admin" && <OrderNotification />*/}
        </div>
        <div className="flex justify-center items-center">
          <div
            className="w-10 h-10 p-1 rounded-full  flex justify-center items-center mr-5 ml-2 shadow-xl shadow-green-900/20 ring-4 ring-gray-800/30 border border-black cursor-pointer"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("storeUser");
            }}
          >
            <MotionGesture>
              <FontAwesomeIcon
                className="pc:text-lg movil:text-sm"
                icon={faRightToBracket}
                color="#ff4242"
              />{" "}
            </MotionGesture>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
