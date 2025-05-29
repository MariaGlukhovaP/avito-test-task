import { Card } from "antd";
import { NavLink } from "react-router-dom";
import { BoardCardProps } from "../../types/boardCardProps";

// Компонент отображает краткую информацию о доске и ссылку для перехода на страницу доски
const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  return (
    <Card
      key={board.id}
      title={board.name}
      extra={<NavLink to={`/board/${board.id}`}>Перейти к доске</NavLink>} // Навигация к конкретной доске по её ID
    >
      <p>{board.description}</p>
      <p>Количество задач: {board.taskCount}</p>
    </Card>
  );
};

export default BoardCard;
