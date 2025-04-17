interface Assignee {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "ToDo" | "InProgress" | "Done";
  assignee: Assignee;
  boardId: number;
  boardName: string;
}
