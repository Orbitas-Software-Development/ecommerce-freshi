import { create } from "zustand";
const companyInformationState = create((set) => ({
  companyInformation: "",
  setCompanyInformation: (companyInformation) => {
    set(() => ({
      companyInformation: companyInformation,
    }));
  },
  /*  setLatePayload: (id) => {
    set((state) => ({
      clients: state.clients.map((value) => {
        if (value.id === id) {
          value.latePayment = !value.latePayment;
        }
        console.log(value);
        return value;
      }),
    }));
  },*/
}));
export default companyInformationState;
