import { useState } from "react";
import { Task } from "../../types/task";
import TaskCard from "../taskCard/taskCard";
import CreateTaskModal from "../taskModal/taskModal";
import { useTasks } from "../../services/useTasks";
import { BoardColumnProps } from "../../types/boardCardColumnProps";
import "./board-column.css";

// Колонка задач на доске с заголовком, списком задач и модалкой для редактирования
const BoardColumn: React.FC<BoardColumnProps> = ({
  title,
  tasks,
  emptyText,
}) => {
  // ID выбранной задачи для редактирования
  const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(
    undefined
  );
  // Флаг отображения модального окна
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Получение всех задач (необходимо для поиска выбранной задачи по ID)
  const { data: allTasks } = useTasks();

  // Определение выбранной задачи по её ID
  const selectedTask = allTasks?.find((task) => task.id === selectedTaskId);

  // Обработка клика по задаче — открытие модального окна и установка выбранной задачи
  const handleTaskClick = (task: Task) => {
    setSelectedTaskId(task.id);
    setIsModalVisible(true);
  };

  // Закрытие модального окна и сброс выбранной задачи
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTaskId(undefined);
  };

  return (
    <div className="board-column">
      <h3>{title}</h3>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task)}
          />
        ))
      ) : (
        <p className="empty-column-text">{emptyText}</p>
      )}
      <CreateTaskModal
        visible={isModalVisible}
        onClose={handleCancel}
        task={selectedTask}
        boardId={selectedTask?.boardId}
      />
    </div>
  );
};

export default BoardColumn;
