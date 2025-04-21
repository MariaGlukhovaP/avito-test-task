import { Task } from "./task";

export interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}
