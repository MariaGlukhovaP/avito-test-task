import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoardsState {
  selectedBoardId: number | null;
}

const initialState: BoardsState = {
  selectedBoardId: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setSelectedBoardId(state, action: PayloadAction<number | null>) {
      state.selectedBoardId = action.payload;
    },
  },
});

export const { setSelectedBoardId } = boardsSlice.actions;
export default boardsSlice.reducer;
