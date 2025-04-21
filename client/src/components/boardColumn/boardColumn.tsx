import { useState } from "react";
import { Issue } from "../../types/issue";
import TaskCard from "../taskCard/taskCard";
import CreateTaskModal from "../taskModal/taskModal";
import "./board-column.css";

interface BoardColumnProps {
  title: string;
  tasks: Issue[];
  emptyText?: string;
}

const BoardColumn: React.FC<BoardColumnProps> = ({
  title,
  tasks,
  emptyText,
}) => {
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
      />
    </div>
  );
};

export default BoardColumn;
