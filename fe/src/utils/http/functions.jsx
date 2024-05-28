import { setTimeOut } from "../utils";

export const okResponseModalHandle = ({
  setModalData = () => {},
  message = "Guardado",
  time = 2000,
  modalIcon = "check",
  route = "",
  navigate = "",
}) => {
  setModalData({
    loading: true,
    text: <> {message}</>,
    icon: modalIcon,
  });

  setTimeOut(() => {
    setModalData({
      loading: false,
    });
    route && navigate(route);
  }, time);
};
export const errorResponseModalHandle = ({
  setModalData = () => {},
  message = "Ocurrio un inconveniente, Comuniquese con SOPORTE",
  time = 2000,
  modalIcon = "warning",
  route = "",
  navigate = "",
}) => {
  setModalData({
    loading: true,
    text: <> {message}</>,
    icon: modalIcon,
  });

  setTimeOut(() => {
    setModalData({
      loading: false,
    });
    route && navigate(route);
  }, time);
};
