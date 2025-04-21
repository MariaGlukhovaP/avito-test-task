import { useState } from "react";
import { Issue } from "../../types/issue";
import TaskCard from "../taskCard/taskCard";
import CreateTaskModal from "../taskModal/taskModal";
import { useTasks } from "../../services/useIssues";
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
  const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(
    undefined
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: allTasks } = useTasks();

  const selectedTask = allTasks?.find((task) => task.id === selectedTaskId);

  const handleTaskClick = (task: Issue) => {
    setSelectedTaskId(task.id);
    setIsModalVisible(true);
  };

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
