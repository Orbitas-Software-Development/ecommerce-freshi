import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SimpleModal from "../../../components/Modals/SimpleModal";
import MicroModal from "react-micro-modal";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import { getUserInfo } from "../../../utils/localStorage/functions";
import Table from "../../../components/Tables/Table/Table";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../../utils/http/functions";
import { TextButton, IconButton } from "../../../components/Button/Button";
import {
  faHome,
  faFloppyDisk,
  faPlus,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
export default function EditEmail() {
  //localstorage
  let user = getUserInfo();
  //local
  const [reportForm, setReportForm] = useState({});
  const [emails, setEmails] = useState([
    { email: `${user.email} (Mi correo)`, filter: true },
  ]);
  const [modalData, setModalData] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  //email
  const [email, setEmail] = useState();
  //Route
  const navigate = useNavigate();
  //params
  const { state } = useLocation();

  //handleForm
  const handleSubmit = (e) => {
    e.preventDefault();
    saveReportInfo();
  };
  const deleteEmail = (emailToDelete) => {
    if (emails.length === 1) {
      setModalData({
        ...modalData,
        loading: true,
        text: (
          <>
            No se puede borrar el <b>unico</b> correo
          </>
        ),
        icon: "info",
      });
    }
    if (emails.length > 1) {
      let email = emails.filter((email) => email.email !== emailToDelete);
      setEmails(email);
    }
  };

  //validate emailexisted
  const emailExisted = (e) => {
    e.preventDefault();
    return emails.find((value) => value.email === e.target.value);
  };
  const [editing, setEditing] = useState(false);
  const [emailExistedError, setEmailExistedError] = useState(false);
  useEffect(() => {
    setModalData({
      ...modalData,
      loading: true,
      text: <>Cargando</>,
      icon: "loading",
    });
    axios
      .get(
        `${process.env.REACT_APP_PROD}/api/report/getReport/${user.companyId}/${state.report}`
      )
      .then((res) => {
        setReportForm(res.data.report);
        setEmails([...emails, ...res.data.emails]);
        setModalData({ loading: false });

        //Correo por defecto guardado en el localhost
      })
      .catch((e) => {
        errorResponseModalHandle({
          message: "No hay datos para cargar",
          setModalData,
          modalIcon: "info",
          navigate: navigate,
        });
        console.log(e);
      });
  }, []);
  //save information
  const saveReportInfo = () => {
    setModalData({
      loading: true,
      text: <>Guardando</>,
      icon: "loading",
    });
    axios
      .put(`${process.env.REACT_APP_PROD}/api/report/saveReport`, {
        report: {
          ...reportForm,
          name: state.report,
          description: `${state.report} ${user.company.name}`,
          companyId: user.company.id,
        },
        emails: emails.filter((value) => !value?.filter),
      })
      .then((res) => {
        setReportForm(res.data.report);
        res.data.emails.length > 0
          ? setEmails([
              { email: `${user.email} (Mi correo)`, filter: true },
              ...res.data.emails,
            ])
          : setEmails([...emails]);

        okResponseModalHandle({
          setModalData,
          message: "Guardado",
        });
      });
  };
  const columns = [
    {
      name: "E-mail",
      center: true,
      sortable: true,
      wrap: true,
      selector: (row) => row.email,
    },
    {
      name: "Editar",
      cell: (row) => (
        <IconButton
          bgColor={`bg-blue-500`}
          hoverBgColor={`hover:bg-blue-500`}
          hoverTextColor={`hover:text-black`}
          otherProperties="w-auto my-1"
          icon={faPencil}
          onClick={(e) => {
            setOpenForm(true);
            setEditing(true);
            setEmail({ ...row, ["previousEmail"]: row.email });
          }}
        />
      ),
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <IconButton
          bgColor={`bg-red-500`}
          hoverBgColor={`hover:bg-red-500`}
          hoverTextColor={`hover:text-black`}
          otherProperties=" my-1"
          icon={faTrashCan}
          onClick={(e) => deleteEmail(row.email)}
        />
      ),
    },
  ];

  const saveEmail = () => {
    if (editing) {
      setEditing(false);
      return setEmails(
        emails.map((value) => {
          if (value.email === email.previousEmail) return email;
          return value;
        })
      );
    }
    setEmails([...emails, { ...email, ["reportId"]: reportForm.id }]);
  };

  const submitEmail = (e) => {
    e.preventDefault();
    if (!emailExistedError) {
      setOpenForm(false);
      setEmail("");
      return saveEmail();
    }
  };
  return (
    <Layout>
      <SimpleModal data={modalData} />
      <MicroModal
        openInitially={false}
        open={openForm}
        trigger={(open) => <div onClick={open}></div>}
      >
        {(close) => (
          <div className="w-full ">
            <form onSubmit={submitEmail}>
              {emailExistedError && (
                <p className="text-red-400 text-lg">Este correo ya existe</p>
              )}
              <label
                for="name"
                className="block mb-4 text-lg font-medium text-gray-900 "
              >
                Correo
              </label>
              <input
                className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  mb-2"
                type="email"
                required
                name="email"
                value={email?.email || ""}
                onChange={(e) => {
                  if (emailExisted(e)) {
                    setEmailExistedError(true);
                    return setEmail({ ...email, ["email"]: e.target.value });
                  } else {
                    setEmailExistedError(false);
                    setEmail({ ...email, ["email"]: e.target.value });
                  }
                }}
              />
              <div>
                <button
                  type="submit"
                  className="w-52 m-1 text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center "
                >
                  Guardar
                </button>
                <button
                  className="w-52 m-1 text-white  text-lg  bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center "
                  onClick={(e) => {
                    setEmailExistedError(false);
                    setOpenForm(false);
                    setEditing(false);
                    setEmail("");
                  }}
                >
                  cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </MicroModal>
      <div className="flex pc:flex-row movil:flex-col w-full">
        <div className="flex-1 p-10">
          <div className="flex justify-center text-2xl font-semibold">
            <p>Información del correo</p>
          </div>
          <div className="flex">
            <TextButton
              text={"Atras"}
              bgColor={`bg-blue-700`}
              hoverBgColor={`hover:bg-blue-700`}
              hoverTextColor={`hover:text-black`}
              otherProperties="max-w-[120px] mx-4 my-4"
              icon={faHome}
              onClick={(e) => {
                navigate("/emails");
              }}
            />
          </div>
          <form onSubmit={handleSubmit} className="border p-5 rounded-md">
            <div className="mb-5">
              <label
                for="documentName"
                className="block mb-2 text-lg  font-medium text-gray-900 "
              >
                Nombre del documento
              </label>
              <input
                className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                id="documentName"
                value={reportForm?.documentName || ""}
                type="text"
                required
                name="documentName"
                autoComplete="false"
                onChange={(e) => {
                  setReportForm({
                    ...reportForm,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-5">
              <label
                for="subject"
                className="block mb-2 text-lg  font-medium text-gray-900 "
              >
                Subject del correo
              </label>
              <input
                id="subject"
                value={reportForm?.subject || ""}
                className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                type="text"
                name="subject"
                autoComplete="false"
                required
                onChange={(e) => {
                  setReportForm({
                    ...reportForm,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextButton
                text={"Guardar"}
                hoverTextColor={`hover:text-black`}
                otherProperties="max-w-[120px] mx-4 my-4"
                icon={faFloppyDisk}
                type={"submit"}
                onClick={(e) => {}}
              />
            </div>
          </form>
        </div>
        <div className="flex-1 p-10">
          <div className="flex justify-center flex-col text-2xl font-semibold">
            <div className="flex justify-center text-2xl font-semibold">
              <p>Correos</p>
            </div>
            {reportForm?.id ? (
              <>
                <div className="flex">
                  <TextButton
                    text={"Agregar"}
                    bgColor={`bg-blue-700`}
                    hoverBgColor={`hover:bg-blue-700`}
                    hoverTextColor={`hover:text-black`}
                    otherProperties="max-w-[120px] mx-4 my-4"
                    icon={faPlus}
                    onClick={(e) => {
                      setOpenForm(true);
                    }}
                  />
                </div>
                <div className="border  rounded-md">
                  <Table columns={columns} data={emails} />

                  <div className="flex justify-center border-t p-5">
                    <TextButton
                      text={"Guardar"}
                      hoverTextColor={`hover:text-black`}
                      otherProperties="max-w-[120px] mx-4 my-4"
                      icon={faFloppyDisk}
                      type={"submit"}
                      onClick={saveReportInfo}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full text-center mt-4">
                <p>Nota: Guarde la información del correo primeramente</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
