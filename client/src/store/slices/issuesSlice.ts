import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Issue {
  id: number;
  title: string;
  status: string;
  boardId: number;
  executor: string;
}

interface IssuesState {
  items: Issue[];
  status: "idle" | "loading" | "failed";
  selectedIssueId: number | null;
  isModalOpen: boolean;
  filters: {
    status: string;
    boardId: number | null;
    searchTitle: string;
    searchExecutor: string;
  };
}

export const fetchIssues = createAsyncThunk<Issue[]>(
  "issues/fetchIssues",
  async () => {
    const response = await fetch("http://localhost:8080/api/v1/tasks");
    if (!response.ok) throw new Error("Ошибка при загрузке задач");

    const json = await response.json();
    return json.data;
  }
);

const initialState: IssuesState = {
  items: [],
  status: "idle",
  selectedIssueId: null,
  isModalOpen: false,
  filters: {
    status: "",
    boardId: null,
    searchTitle: "",
    searchExecutor: "",
  },
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<number>) => {
      state.selectedIssueId = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.selectedIssueId = null;
      state.isModalOpen = false;
    },
    setFilter: (
      state,
      action: PayloadAction<Partial<IssuesState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { openModal, closeModal, setFilter } = issuesSlice.actions;
export default issuesSlice.reducer;
