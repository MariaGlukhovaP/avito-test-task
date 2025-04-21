import { Task } from "./task";

export interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  task?: Task;
  boardName?: string;
  boardId?: string;
}
