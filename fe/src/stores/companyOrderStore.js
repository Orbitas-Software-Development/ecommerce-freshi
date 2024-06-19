import { create } from "zustand";
const companyOrderState = create((set) => ({
  companyOrder: "",
  setCompanyOrder: (companyOrder) => {
    set(() => ({
      companyOrder: companyOrder,
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
export default companyOrderState;
