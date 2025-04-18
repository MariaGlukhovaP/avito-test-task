import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BoardColumn from "../../components/boardColumn/boardColumn";
import {
  fetchTasks,
  selectTasks,
  selectLoading,
} from "../../store/slices/issuesSlice";
import { Issue } from "../../types/issue";
import { Board } from "../../types/board";
import { AppDispatch } from "../../store/store";
import Header from "../../components/header/header";
import "./boardPage.css";

const BoardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/boards/${id}`);
        const data = await res.json();
        setBoard(data);
      } catch (error) {
        console.error("Ошибка загрузки доски", error);
      }
    };

    fetchBoard();
  }, [id]);

  const boardTasks = useMemo(() => {
    return tasks.filter((task: Issue) => task.boardId === Number(id));
  }, [tasks, id]);

  const groupedTasks = {
    todo: boardTasks.filter((task) => task.status === "ToDo"),
    inProgress: boardTasks.filter((task) => task.status === "InProgress"),
    done: boardTasks.filter((task) => task.status === "Done"),
  };

  return (
    <div className="container">
      <Header />
      {loading && <p>Загрузка...</p>}
      {!loading && board && (
        <>
          <h2 className="board-title">{board.name}</h2>
          <div className="board-columns">
            <BoardColumn
              title="To do"
              tasks={groupedTasks.todo}
              emptyText="Нет задач к выполнению"
            />
            <BoardColumn
              title="In progress"
              tasks={groupedTasks.inProgress}
              emptyText="Нет задач в процессе выполнения"
            />
            <BoardColumn
              title="Done"
              tasks={groupedTasks.done}
              emptyText="Нет завершенных задач"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BoardPage;
