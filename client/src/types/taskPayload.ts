export interface TaskPayload {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "ToDo" | "InProgress" | "Done";
  assignee: string;
  boardId: number;
}
