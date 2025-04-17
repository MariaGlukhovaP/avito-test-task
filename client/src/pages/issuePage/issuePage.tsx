import { Button } from "antd";
import CreateTaskButton from "../../components/createTaskBtn/createTaskBtn";
import TaskFilters from "../../components/taskFilters/taskFilters";
import TaskList from "../../components/taskList/taskList";
import TaskModal from "../../components/taskModal/taskModal";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import "./issuePage.css";
import { fetchTasks } from "../../store/slices/issuesSlice";

const IssuesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.issues
  );
  const [filters, setFilters] = useState({
    searchTitle: "",
    status: "",
    boardId: "",
    assignee: "",
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleFilterChange = (filters: any) => {
    setFilters(filters);
  };

  const filteredTasks = tasks.filter((task) => {
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
      <header className="header">
        <div className="header-container">
          <div>
            <Button type="link">
              <NavLink
                to="/issues"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Все задачи
              </NavLink>
            </Button>
            <Button type="link">
              <NavLink to="/projects">Проекты</NavLink>
            </Button>
          </div>
          <CreateTaskButton />
        </div>
      </header>
      <TaskFilters onFilterChange={handleFilterChange} />
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {filteredTasks && !loading && !error && (
        <TaskList tasks={filteredTasks} />
      )}
      <TaskModal />
    </div>
  );
};

export default IssuesPage;
