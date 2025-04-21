import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { Task } from "../../types/task";

// Интерфейс для состояния пользователей и их задач
interface UsersState {
  users: User[];
  selectedUserTasks: Task[];
}

// Начальное состояние для пользователей и их задач
const initialState: UsersState = {
  users: [],
  selectedUserTasks: [],
};

// Слайс для управления состоянием пользователей и их задач
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Редьюсер для установки списка пользователей
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    // Редьюсер для установки задач выбранного пользователя
    setSelectedUserTasks(state, action: PayloadAction<Task[]>) {
      state.selectedUserTasks = action.payload;
    },
  },
});

// Экспорт действий для изменения состояния
export const { setUsers, setSelectedUserTasks } = usersSlice.actions;
// Экспорт редьюсера для использования в store
export default usersSlice.reducer;
