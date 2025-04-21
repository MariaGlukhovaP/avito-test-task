import { Issue } from "./issue";

export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
  tasks: Issue[];
}
