import { Button } from "antd";
import { NavLink } from "react-router-dom";
import CreateTaskButton from "../createTaskBtn/createTaskBtn";

const Header: React.FC = () => {
  return (
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
  );
};

export default Header;
