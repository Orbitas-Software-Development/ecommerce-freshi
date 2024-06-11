import { create } from "zustand";
const clientPriceListState = create((set) => ({
  clientPriceList: {},
  setClientPriceList: (clientPriceList) => {
    set(() => ({
      clientPriceList: clientPriceList,
    }));
  },
}));
export default clientPriceListState;
