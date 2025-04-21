import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import boardsReducer from "./slices/boardsSlice";

// Создание Redux store с двумя слайсами для задач и досок
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    boards: boardsReducer,
  },
});

// Типы для состояния и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
