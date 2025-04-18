import { Board } from "./board";

export interface BoardsState {
  boards: Board[];
  loading: boolean;
  error: string | null;
}
