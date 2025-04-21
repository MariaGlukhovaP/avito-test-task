import { Task } from "./task";

export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
  tasks: Task[];
}
