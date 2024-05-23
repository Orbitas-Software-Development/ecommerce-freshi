import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SimpleModal from "../../../components/Modals/SimpleModal";
import MicroModal from "react-micro-modal";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import { getUserInfo } from "../../../utils/localStorage/functions";
import Table from "../../../components/Tables/Table/Table";
export default function EditEmail() {
  //local
  const [reportForm, setReportForm] = useState({});
  const [emails, setEmails] = useState([]);
  const [modalData, setModalData] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  //email
  const [email, setEmail] = useState();
  //Route
  const navigate = useNavigate();
  //params
  const { state } = useLocation();
  //localstorage
  let user = getUserInfo();
  //handleForm
  const handleSubmit = (e) => {
    e.preventDefault();
    saveReportInfo();
  };
  const deleteEmail = (id) => {
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
      let email = emails.filter((email) => email.id !== id);
      setEmails(email);
    }
  };
  //get Information

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
        `${process.env.REACT_APP_PRO}/api/report/getReport/${user.companyId}/${state.report}`
      )
      .then((res) => {
        setReportForm(res.data.report);
        setEmails(res.data.emails);
        setModalData({ loading: false });
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
      .put(`${process.env.REACT_APP_PRO}/api/report/saveReport`, {
        Report: reportForm,
        Emails: emails,
      })
      .then((res) => {
        setModalData({
          loading: false,
        });
      });
  };
  const columns = [
    {
      name: "E-mail",
      selector: (row) => row.email,
    },
    {
      name: "Editar",
      cell: (row) => (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={(e) => {
            setOpenForm(true);
            setEditing(true);
            setEmail(row);
          }}
        >
          Editar
        </button>
      ),
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md m-4 mx-6 text-lg"
          type="button"
          onClick={(e) => deleteEmail(row.id)}
        >
          Eliminar
        </button>
      ),
    },
  ];

  const saveEmail = () => {
    if (editing) {
      return setEmails(
        emails.map((value) => {
          if (value.id === email.id) return email;
          return value;
        })
      );
    }
    setEmails([...emails, { ...email, ["reportId"]: emails[0].reportId }]);
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
          <div className="w-full">
            {emailExistedError && (
              <p className="text-red-400 text-lg">Este correo ya existe</p>
            )}

            <label
              for="name"
              class="block mb-4 text-lg font-medium text-gray-900 dark:text-white"
            >
              Correo
            </label>
            <input
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
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
                className="w-52 m-1 text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => {
                  if (!emailExistedError) {
                    setOpenForm(false);
                    setEmail("");
                    return saveEmail();
                  }
                }}
              >
                Guardar
              </button>
              <button
                className="w-52 m-1 text-white  text-lg  bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          </div>
        )}
      </MicroModal>
      <div className="flex w-full">
        <div className="flex-1 p-10">
          <div className="flex justify-center text-2xl font-semibold">
            <p>Información del correo</p>
          </div>
          <button
            type="submit"
            class="text-white w-[100px] text-lg mx-2 my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              navigate("/emails");
            }}
          >
            Atras
          </button>
          <form onSubmit={handleSubmit} className="border p-5 rounded-md">
            <div className="mb-5">
              <label
                for="documentName"
                className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
              >
                Nombre del documento
              </label>
              <input
                className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
              >
                Subject del correo
              </label>
              <input
                id="subject"
                value={reportForm?.subject || ""}
                className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <button
                type="submit"
                className="w-52 text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1 p-10">
          <div className="flex justify-center flex-col text-2xl font-semibold">
            <div className="flex justify-center text-2xl font-semibold">
              <p>Correos</p>
            </div>
            <button
              type="submit"
              className="text-white w-[150px] text-lg mx-2  my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => {
                setOpenForm(true);
              }}
            >
              Agregar <i class="fa-solid fa-plus"></i>
            </button>
            <div className="border  rounded-md">
              <Table columns={columns} data={emails} />{" "}
              <div className="flex justify-center border-t p-5">
                <button
                  type="submit"
                  className="w-52 text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={saveReportInfo}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
