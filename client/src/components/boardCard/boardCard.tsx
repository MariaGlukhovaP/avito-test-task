import { Card } from "antd";
import { NavLink } from "react-router-dom";
import { Board } from "../../types/board";

interface BoardCardProps {
  board: Board;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  return (
    <Card
      key={board.id}
      title={board.name}
      extra={<NavLink to={`/board/${board.id}`}>Перейти к доске</NavLink>}
    >
      <p>{board.description}</p>
      <p>Количество задач: {board.taskCount}</p>
    </Card>
  );
};

export default BoardCard;
