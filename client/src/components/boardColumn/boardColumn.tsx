import { Issue } from "../../types/issue";
import TaskCard from "../taskCard/taskCard";
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
  return (
    <div className="board-column">
      <h3>{title}</h3>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p className="empty-column-text">{emptyText}</p>
      )}
    </div>
  );
};

export default BoardColumn;
