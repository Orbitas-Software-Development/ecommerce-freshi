import { React, useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import MicroModal from "react-micro-modal";
import orderDetailStore from "../../stores/orderDetailStore";
import axios from "axios";
import { getUserInfo } from "../../utils/localStorage/functions";
import { Link, useNavigate } from "react-router-dom";
export default function Signature({ action, loading, processed }) {
  //localStorage
  const user = getUserInfo();
  //local
  //navigate
  const navigate = new useNavigate();
  const [message, setMessage] = useState(false);
  const [latePayment, setLatePayment] = useState();
  const [confirmed, setconfirmed] = useState(false);
  const [latePaymentMessage, setLatePaymentMessage] = useState();
  //global
  const setSignature = orderDetailStore((state) => state.setSignature);
  const signature = orderDetailStore((state) => state.signature);
  const sigCanvas = useRef();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_DEV}/api/client/getLatePaymentByClientId/${user.branch.clientId}`
      )
      .then((res) => {
        setLatePayment(res.data);
        axios
          .get(
            `${process.env.REACT_APP_DEV}/api/companyInformation/getInfo/${user.branch.client.companyId}`
          )
          .then((res) => {
            setLatePaymentMessage(res.data.information);
          });
      });
    setSignature("");
  }, []);

  return (
    <>
      <MicroModal
        closeOnOverlayClick={false}
        trigger={(open) => (
          <div onClick={open}>
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md my-4 mx-6 text-lg">
              Procesar
            </button>
          </div>
        )}
      >
        {(close) => (
          <>
            {latePayment ? (
              <div>
                <p className="text-xl text-center">
                  {latePaymentMessage.latePaymentMessage}
                </p>

                <div className="flex justify-center">
                  <button
                    className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md my-4 text-lg"
                    onClick={() => {
                      navigate("/home");
                      window.location.reload();
                    }}
                  >
                    <i class="fa-solid fa-arrow-left text-lg"></i> Inicio
                  </button>
                </div>
              </div>
            ) : !loading ? (
              confirmed ? (
                <div className="flex justify-center flex-col">
                  <p className="text-xl text-center">
                    ¿Desea <b>confirmar</b> su pedido?
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md my-4 mx-6 text-lg"
                      onClick={(e) => {
                        close;
                        setconfirmed(false);
                      }}
                    >
                      Cancelar
                    </button>

                    <button
                      className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md my-4 mx-6 text-lg"
                      onClick={(e) => {
                        if (signature) {
                          return action();
                        }
                        setMessage(true);
                      }}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div>
                      <p className="text-xl font-semibold">
                        Realice su firma en el siguiente espacio: {loading}
                      </p>{" "}
                      <button
                        className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md my-4 text-lg"
                        onClick={() => {
                          setSignature("");
                          sigCanvas.current.clear();
                        }}
                      >
                        Limpiar
                      </button>
                      {loading}
                    </div>
                    <SignatureCanvas
                      canvasProps={{
                        width: 450,
                        height: 200,
                        style: { border: "1px solid #000000" },
                      }}
                      ref={sigCanvas}
                      onEnd={() => {
                        console.log(
                          sigCanvas.current
                            .getTrimmedCanvas()
                            .toDataURL("image/jpg")
                            .split(",", 2)[1]
                        );
                        setSignature(
                          sigCanvas.current
                            .getTrimmedCanvas()
                            .toDataURL("image/jpg")
                            .split(",", 2)[1]
                        );
                      }}
                    />
                    <div className="flex justify-center flex-col">
                      <div>
                        <p
                          className={`${
                            message ? "block" : "hidden"
                          }  font-semibold text-red-500 text-xl text-center`}
                        >
                          Por favor digite su firma
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md my-4 mx-6 text-lg"
                          onClick={close}
                        >
                          Cancelar
                        </button>

                        <button
                          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md my-4 mx-6 text-lg"
                          onClick={(e) => {
                            setconfirmed(true);
                          }}
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )
            ) : (
              <div>
                {!processed ? (
                  <p className="text-xl font-bold">
                    Procesando...
                    <i className="fa-solid fa-circle-notch fa-spin fa-xl  ml-1"></i>{" "}
                  </p>
                ) : (
                  <p className="text-xl font-bold">
                    Procesada
                    <i
                      className="fa-solid fa-circle-check fa-xl ml-1"
                      style={{ color: "#63E6BE" }}
                    ></i>
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </MicroModal>
    </>
  );
}
