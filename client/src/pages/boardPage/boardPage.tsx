import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Issue } from "../../types/issue";
import BoardColumn from "../../components/boardColumn/boardColumn";
import Header from "../../components/header/header";
import { Board } from "../../types/board";
import { useBoards } from "../../services/useBoards";
import { useTasks } from "../../services/useIssues";
import "./boardPage.css";

const BoardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Ошибка: ID доски не найдено</p>;
  }

  const {
    data: boards = [],
    isLoading: isBoardsLoading,
    isError: isBoardsError,
  } = useBoards();

  const {
    data: tasks = [],
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useTasks();

  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    const foundBoard = boards.find((board) => board.id.toString() === id);
    if (foundBoard) {
      setBoard(foundBoard);
    }
  }, [id, boards]);

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
      {(isBoardsLoading || isTasksLoading) && <p>Загрузка...</p>}
      {(isBoardsError || isTasksError) && <p>Ошибка при загрузке данных</p>}
      {board && !isBoardsLoading && !isTasksLoading && (
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
      {!board && !isBoardsLoading && !isTasksLoading && <p>Доска не найдена</p>}
    </div>
  );
};

export default BoardPage;
