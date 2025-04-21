import { Card, Tag, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";
import { TaskCardProps } from "../../types/taskcardProps";

// Карточка задачи с описанием и переходом к доске
const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const location = useLocation();

  // Проверка, находится ли пользователь на странице конкретной доски
  const isOnBoardPage = /^\/board\/\d+$/.test(location.pathname);

  return (
    <Card
      key={task.id}
      title={task.title}
      // Ссылка на доску отображается только вне страницы доски
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
        {/* Цвет тега в зависимости от приоритета */}
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
      {/* Название доски отображается, если оно передано */}
      {task.boardName && (
        <p>
          <strong>Доска:</strong> {task.boardName}
        </p>
      )}
    </Card>
  );
};

export default TaskCard;
