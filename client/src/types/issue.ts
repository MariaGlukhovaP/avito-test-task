import { User } from "./user";

export interface Issue {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Backlog" | "InProgress" | "Done";
  assignee: User;
  boardId: number;
  boardName: string;
}
