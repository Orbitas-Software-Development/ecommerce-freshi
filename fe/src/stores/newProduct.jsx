import { create } from "zustand";
const branchesState = create((set) => ({
  branches: [],
  image: "",
  cropImage: "",
  setImage: (brancihes) => {
    set(() => ({
      branches: branches,
    }));
  },
  setImage: (branches) => {
    set(() => ({
      branches: branches,
    }));
  },
}));
export default branchesState;
