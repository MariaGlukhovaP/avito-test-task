import { Card } from "antd";
import { Link } from "react-router-dom";
import { Issue } from "../../types/issue";

interface TaskListProps {
  tasks: Issue[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Card
          key={task.id}
          title={task.title}
          style={{ marginBottom: "10px" }}
          extra={<Link to={`/board/${task.boardId}`}>Перейти к доске</Link>}
        >
          <p>{task.description}</p>
          <p>
            <strong>Исполнитель:</strong> {task.executor}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
