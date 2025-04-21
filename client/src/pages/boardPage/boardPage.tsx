import { useParams } from "react-router-dom";
import { useMemo } from "react";
import BoardColumn from "../../components/boardColumn/boardColumn";
import "./boardPage.css";
import Header from "../../components/header/header";
import { useBoard } from "../../services/useBoard";
import { useBoards } from "../../services/useBoards";

const BoardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>Ошибка: ID доски не найдено</p>;

  const {
    data: boards,
    isLoading: isBoardsLoading,
    isError: isBoardsError,
  } = useBoards();

  const {
    data: boardTasks = [],
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useBoard(id);
  console.log(boardTasks);

  const currentBoard = useMemo(() => {
    return boards?.find((b) => b.id === Number(id));
  }, [boards, id]);

  const groupedTasks = useMemo(() => {
    return {
      todo: boardTasks.filter((task) => task.status === "Backlog"),
      inProgress: boardTasks.filter((task) => task.status === "InProgress"),
      done: boardTasks.filter((task) => task.status === "Done"),
    };
  }, [boardTasks]);

  return (
    <div className="container">
      <Header boardName={currentBoard?.name} boardId={currentBoard?.id} />

      {(isBoardsLoading || isTasksLoading) && <p>Загрузка...</p>}
      {(isBoardsError || isTasksError) && <p>Ошибка при загрузке данных</p>}

      {currentBoard && !isBoardsLoading && !isTasksLoading && (
        <>
          <h2 className="board-title">{currentBoard.name}</h2>
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

      {!currentBoard && !isBoardsLoading && !isTasksLoading && (
        <p>Доска не найдена</p>
      )}
    </div>
  );
};

export default BoardPage;
