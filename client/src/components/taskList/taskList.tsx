import { Task } from "../../types/task";
import TaskCard from "../taskCard/taskCard";
import { useState } from "react";
import CreateTaskModal from "../taskModal/taskModal";
import { Button } from "antd";
import { TaskListProps } from "../../types/taskListProps";
import "./taskList.css";

// Компонент списка задач, отображающий карточки задач и модальное окно для создания/редактирования
const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // Состояние выбранной задачи для редактирования
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  // Состояние видимости модального окна
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Обработчик клика по задаче — открытие модальное окно и установка выбранной задачи
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  // Закрытие модальное окно и сброс выбранной задачи
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTask(undefined);
  };

  // Открытие пустой модальное окнр для создания задачи
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <div className="container">
        {/* Отображение списка карточек задач */}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task)}
          />
        ))}
        {/* Кнопка создания новой задачи и модальное окно */}
        <div className="tasks-button">
          <Button type="primary" onClick={showModal}>
            Создать задачу
          </Button>
          <CreateTaskModal
            visible={isModalVisible}
            onClose={handleCancel}
            task={selectedTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
