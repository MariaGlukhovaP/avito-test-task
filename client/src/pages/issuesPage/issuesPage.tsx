import { useState } from "react";
import { Task } from "../../types/task";
import TaskFilters from "../../components/taskFilters/taskFilters";
import TaskList from "../../components/taskList/taskList";
import Header from "../../components/header/header";
import { useTasks } from "../../services/useTasks";
import "./issuesPage.css";

const IssuesPage: React.FC = () => {
  // Получаем список задач с сервера
  const { data: tasks = [], isLoading, isError, error } = useTasks();

  // Локальное состояние для фильтров
  const [filters, setFilters] = useState({
    searchTitle: "", // Фильтр по названию задачи
    status: "", // Фильтр по статусу
    boardId: "", // Фильтр по ID доски
    assignee: "", // Фильтр по исполнителю
  });

  // Обработчик изменений фильтров
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // Применяем фильтры к задачам
  const filteredTasks: Task[] = tasks.filter((task) => {
    const matchesTitle =
      task.title.toLowerCase().includes(filters.searchTitle.toLowerCase()) ||
      !filters.searchTitle;
    const matchesStatus =
      task.status.toLowerCase().includes(filters.status.toLowerCase()) ||
      !filters.status;
    const matchesBoardId =
      task.boardId.toString() === filters.boardId || !filters.boardId;
    const matchesAssignee =
      task.assignee.fullName
        .toLowerCase()
        .includes(filters.assignee.toLowerCase()) || !filters.assignee;

    return matchesTitle && matchesStatus && matchesBoardId && matchesAssignee;
  });

  return (
    <div className="container">
      {/* Заголовок страницы */}
      <Header />
      {/* Компонент для фильтров */}
      <TaskFilters onFilterChange={handleFilterChange} />
      {/* Отображаем индикатор загрузки или ошибку */}
      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Ошибка: {(error as Error).message}</p>}
      {/* Отображаем отфильтрованные задачи */}
      {!isLoading && !isError && <TaskList tasks={filteredTasks} />}
    </div>
  );
};

export default IssuesPage;
