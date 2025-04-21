import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Интерфейс для состояния фильтров
interface FiltersState {
  status: string;
  boardId: string | null;
  search: string;
}

// Начальное состояние фильтров
const initialState: FiltersState = {
  status: "",
  boardId: null,
  search: "",
};

// Слайс для управления состоянием фильтров
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Редьюсер для установки статуса фильтра
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    // Редьюсер для установки ID доски фильтра
    setBoardId(state, action: PayloadAction<string | null>) {
      state.boardId = action.payload;
    },
    // Редьюсер для установки поискового запроса
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

// Экспорт действий для изменения состояния фильтров
export const { setStatus, setBoardId, setSearch } = tasksSlice.actions;
// Экспорт редьюсера для использования в store
export default tasksSlice.reducer;
