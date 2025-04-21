import { BoardListProps } from "../../types/boardListProps";
import BoardCard from "../boardCard/boardCard";

// Компонент отображает список досок в виде карточек
const BoardList: React.FC<BoardListProps> = ({ boards }) => {
  return (
    <div className="container">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BoardList;
