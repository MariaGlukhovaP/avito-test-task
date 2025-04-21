import { useParams } from "react-router-dom";
import { useMemo } from "react";
import BoardColumn from "../../components/boardColumn/boardColumn";
import Header from "../../components/header/header";
import { useBoard } from "../../services/useBoard";
import { useBoards } from "../../services/useBoards";
import "./boardPage.css";

const BoardPage: React.FC = () => {
  // Получаем id доски из параметров маршрута
  const { id } = useParams<{ id: string }>();

  // Если id не найден, выводим ошибку
  if (!id) return <p>Ошибка: ID доски не найдено</p>;

  // Загружаем все доски
  const {
    data: boards,
    isLoading: isBoardsLoading,
    isError: isBoardsError,
  } = useBoards();

  // Загружаем задачи для текущей доски
  const {
    data: boardTasks = [],
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useBoard(id);

  // Находим текущую доску по ID
  const currentBoard = useMemo(
    () => boards?.find((b) => b.id === Number(id)),
    [boards, id]
  );

  // Группируем задачи по статусу
  const groupedTasks = useMemo(
    () => ({
      todo: boardTasks.filter((task) => task.status === "Backlog"),
      inProgress: boardTasks.filter((task) => task.status === "InProgress"),
      done: boardTasks.filter((task) => task.status === "Done"),
    }),
    [boardTasks]
  );

  // Основной рендер страницы доски
  return (
    <div className="container">
      <Header
        boardName={currentBoard?.name}
        boardId={String(currentBoard?.id)}
      />

      {/* Отображаем индикатор загрузки или ошибку */}
      {(isBoardsLoading || isTasksLoading) && <p>Загрузка...</p>}
      {(isBoardsError || isTasksError) && <p>Ошибка при загрузке данных</p>}

      {/* Если доска найдена, отображаем задачи */}
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

      {/* Если доска не найдена */}
      {!currentBoard && !isBoardsLoading && !isTasksLoading && (
        <p>Доска не найдена</p>
      )}
    </div>
  );
};

export default BoardPage;
