import { create } from "zustand";
const ivaState = create((set) => ({
  iva: [],
  setIva: (iva) => {
    set(() => ({
      iva: iva,
    }));
  },
}));
export default ivaState;
