import { Card, Tag, Avatar } from "antd";
import { Issue } from "../../types/issue";
import { Link, useLocation } from "react-router-dom";

interface TaskCardProps {
  task: Issue;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const location = useLocation();
  const isOnBoardPage = /^\/board\/\d+$/.test(location.pathname);

  return (
    <Card
      key={task.id}
      title={task.title}
      extra={
        !isOnBoardPage && (
          <Link to={`/board/${task.boardId}`}>Перейти к доске</Link>
        )
      }
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <p>{task.description}</p>
      <p>
        <strong>Статус:</strong> <Tag>{task.status}</Tag>
      </p>
      <p>
        <strong>Приоритет:</strong>
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
        <strong>Исполнитель:</strong>
        <span>
          <Avatar src={task.assignee.avatarUrl} size="small" />{" "}
          {task.assignee.fullName}
        </span>
      </p>
      {task.boardName && (
        <p>
          <strong>Доска:</strong> {task.boardName}
        </p>
      )}
    </Card>
  );
};

export default TaskCard;
