import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейс для состояния досок
interface BoardsState {
  selectedBoardId: number | null; // ID выбранной доски, может быть null, если доска не выбрана
}

// Начальное состояние
const initialState: BoardsState = {
  selectedBoardId: null,
};

// Слайс для управления состоянием досок
const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // Редьюсер для установки выбранного ID доски
    setSelectedBoardId(state, action: PayloadAction<number | null>) {
      state.selectedBoardId = action.payload;
    },
  },
});

// Экспорт действия для изменения состояния выбранной доски
export const { setSelectedBoardId } = boardsSlice.actions;
// Экспорт редьюсера для использования в store
export default boardsSlice.reducer;
