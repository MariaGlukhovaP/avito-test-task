import { Task } from "./task";

export interface BoardColumnProps {
  title: string;
  tasks: Task[];
  emptyText?: string;
}
