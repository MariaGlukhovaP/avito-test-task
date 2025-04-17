import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Issue } from "../../types/issue";
import { RootState } from "../store";

interface IssuesState {
  tasks: Issue[];
  loading: boolean;
  error: string | null;
}

const initialState: IssuesState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<Issue[], void>(
  "issues/fetchTasks",
  async () => {
    const response = await fetch("http://127.0.0.1:8080/api/v1/tasks"); // Здесь используется запрос к API
    const data = await response.json();
    return data.data;
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const selectTasks = (state: RootState) => state.issues.tasks;
export const selectLoading = (state: RootState) => state.issues.loading;
export const selectError = (state: RootState) => state.issues.error;

export default issuesSlice.reducer;
