export interface TaskModalProps {
  visible: boolean;
  taskId?: number;
  boardId?: number;
  onClose: () => void;
}
