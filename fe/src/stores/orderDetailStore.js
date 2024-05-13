import { create } from "zustand";
const orderDetailState = create((set) => ({
  signature: "",
  setSignature: (signatureBase64) => {
    set(() => ({
      signature: signatureBase64,
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
export default orderDetailState;
