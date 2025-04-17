import { Button } from "antd";
import CreateTaskButton from "../../components/createTaskBtn/createTaskBtn";
import TaskFilters from "../../components/taskFilters/taskFilters";
import TaskList from "../../components/taskList/taskList";
import TaskModal from "../../components/taskModal/taskModal";
import { NavLink } from "react-router-dom";
import { useIssuesQuery } from "../../services/issues";
import "./issuePage.css";

const IssuesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useIssuesQuery();

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
      <TaskFilters />
      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Ошибка: {(error as Error).message}</p>}
      {data && <TaskList tasks={data} />}
      <TaskModal />
    </div>
  );
};

export default IssuesPage;
