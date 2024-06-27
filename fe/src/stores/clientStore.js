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

        return value;
      }),
    }));
  },
  setActiveUser: (id) => {
    set((state) => ({
      clients: state.clients.map((value) => {
        if (value.id === id) {
          value.isClient = !value.isClient;
        }
        return value;
      }),
    }));
  },
}));
export default clientState;
