import { create } from "zustand";
const clientState = create((set) => ({
  clients: [],
  setClients: (clients) => {
    set(() => ({
      clients: clients,
    }));
  },
  setLatePayload: (id) => {
    set((state) => ({
      clients: state.clients.map((value) => {
        if (value.id === id) {
          value.latePayment = !value.latePayment;
        }
        console.log(value);
        return value;
      }),
    }));
  },
}));
export default clientState;
