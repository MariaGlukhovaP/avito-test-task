import { Button } from "antd";
import { NavLink } from "react-router-dom";
import CreateTaskButton from "../../components/createTaskBtn/createTaskBtn";
import { useEffect, useState } from "react";
import { Board } from "../../types/board";
import BoardList from "../../components/boardList/boardList";

const fetchBoards = async () => {
  const response = await fetch("http://localhost:8080/api/v1/boards");
  const data = await response.json();
  return data.data;
};

const BoardsPage: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const boardsData = await fetchBoards();
        setBoards(boardsData);
        setLoading(false);
      } catch (err) {
        setError("Ошибка при загрузке данных.");
        setLoading(false);
      }
    };
    loadBoards();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div className="header-container">
          <div>
            <Button type="link">
              <NavLink to="/issues">Все задачи</NavLink>
            </Button>
            <Button type="link">
              <NavLink
                to="/boards"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Проекты
              </NavLink>
            </Button>
          </div>
          <CreateTaskButton />
        </div>
      </header>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {!loading && !error && <BoardList boards={boards} />}
    </div>
  );
};

export default BoardsPage;
