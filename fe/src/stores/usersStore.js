import { create } from "zustand";
const usersState = create((set) => ({
  users: [],
  setUsers: (users) => {
    set(() => ({
      users: users,
    }));
  },
}));
export default usersState;
