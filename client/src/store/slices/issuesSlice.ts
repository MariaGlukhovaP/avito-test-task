import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  status: string;
  boardId: string | null;
  search: string;
}

const initialState: FiltersState = {
  status: "",
  boardId: null,
  search: "",
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setBoardId(state, action: PayloadAction<string | null>) {
      state.boardId = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setStatus, setBoardId, setSearch } = issuesSlice.actions;
export default issuesSlice.reducer;
