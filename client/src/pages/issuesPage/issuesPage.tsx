import { useState } from "react";
import { Issue } from "../../types/issue";
import TaskFilters from "../../components/taskFilters/taskFilters";
import TaskList from "../../components/taskList/taskList";
import Header from "../../components/header/header";
import { useTasks } from "../../services/useIssues";
import "./issuesPage.css";

const IssuesPage: React.FC = () => {
  const { data: tasks = [], isLoading, isError, error } = useTasks();

  const [filters, setFilters] = useState({
    searchTitle: "",
    status: "",
    boardId: "",
    assignee: "",
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filteredTasks: Issue[] = tasks.filter((task) => {
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
      <Header />
      <TaskFilters onFilterChange={handleFilterChange} />
      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Ошибка: {(error as Error).message}</p>}
      {!isLoading && !isError && <TaskList tasks={filteredTasks} />}
    </div>
  );
};

export default IssuesPage;
