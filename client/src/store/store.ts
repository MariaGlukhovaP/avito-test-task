import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./slices/issuesSlice";
import boardsReducer from "./slices/boardsSlice";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    boards: boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
