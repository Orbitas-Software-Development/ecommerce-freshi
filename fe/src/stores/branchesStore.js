import { create } from "zustand";
const branchesState = create((set) => ({
  branches: [],
  setBranches: (branches) => {
    set(() => ({
      branches: branches,
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
export default branchesState;
