import { Card, Tag, Avatar } from "antd";
import { Issue } from "../../types/issue";
import { Link } from "react-router-dom";

interface TaskCardProps {
  task: Issue;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
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
  );
};

export default TaskCard;
