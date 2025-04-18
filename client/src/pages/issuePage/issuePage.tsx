import { Button } from "antd";
import CreateTaskButton from "../../components/createTaskBtn/createTaskBtn";
import TaskFilters from "../../components/taskFilters/taskFilters";
import TaskList from "../../components/taskList/taskList";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchTasks } from "../../store/slices/issuesSlice";
import "./issuePage.css";
import Header from "../../components/header/header";

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
      <Header />
      <TaskFilters onFilterChange={handleFilterChange} />
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {filteredTasks && !loading && !error && (
        <TaskList tasks={filteredTasks} />
      )}
      <CreateTaskButton />
    </div>
  );
};

export default IssuesPage;
