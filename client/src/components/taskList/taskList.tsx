import { Issue } from "../../types/issue";
import TaskCard from "../taskCard/taskCard";
import { useState } from "react";
import CreateTaskModal from "../taskModal/taskModal";
import { Button } from "antd";
import "./taskList.css";
interface TaskListProps {
  tasks: Issue[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState<Issue | undefined>(
    undefined
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTaskClick = (task: Issue) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTask(undefined);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <div className="container">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task)}
          />
        ))}
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
