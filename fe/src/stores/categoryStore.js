import { create } from "zustand";
const categoryState = create((set) => ({
  categories: [],
  setCategories: (categories) => {
    set(() => ({
      categories: categories,
    }));
  },
}));
export default categoryState;
