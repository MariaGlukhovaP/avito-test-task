import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { Issue } from "../../types/issue";

interface UsersState {
  users: User[];
  selectedUserTasks: Issue[];
}

const initialState: UsersState = {
  users: [],
  selectedUserTasks: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setSelectedUserTasks(state, action: PayloadAction<Issue[]>) {
      state.selectedUserTasks = action.payload;
    },
  },
});

export const { setUsers, setSelectedUserTasks } = usersSlice.actions;
export default usersSlice.reducer;
