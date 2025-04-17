import { Card, Tag, Avatar } from "antd";
import { Issue } from "../../types/issue";
import { Link } from "react-router-dom";

interface TaskListProps {
  tasks: Issue[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="container">
      {tasks.map((task) => (
        <Card
          key={task.id}
          title={task.title}
          extra={<Link to={`/board/${task.boardId}`}>Перейти к доске</Link>}
        >
          <p>{task.description}</p>
          <p>
            <strong>Статус:</strong> <Tag>{task.status}</Tag>
          </p>
          <p>
            <strong>Приоритет:</strong>{" "}
            <Tag
              color={
                task.priority === "High"
                  ? "red"
                  : task.priority === "Medium"
                  ? "yellow"
                  : "green"
              }
            >
              {task.priority}
            </Tag>
          </p>
          <p>
            <strong>Исполнитель:</strong>{" "}
            <span>
              <Avatar src={task.assignee.avatarUrl} size="small" />
              {task.assignee.fullName}
            </span>
          </p>
          <p>
            <strong>Доска:</strong> {task.boardName}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
