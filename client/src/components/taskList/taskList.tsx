import { Issue } from "../../types/issue";
import TaskCard from "../taskCard/taskCard";
import { useState } from "react";
import CreateTaskModal from "../taskModal/taskModal";

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

  return (
    <div className="container">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClick={() => handleTaskClick(task)}
        />
      ))}

      <CreateTaskModal
        visible={isModalVisible}
        onClose={handleCancel}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskList;
