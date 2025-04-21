export interface TaskPayload {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "BackLog" | "InProgress" | "Done";
  assignee: string;
  boardId: number;
}
