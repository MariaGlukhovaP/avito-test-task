import { Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import CreateTaskModal from "../taskModal/taskModal";

const Header: React.FC = () => {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isIssuesActive = location.pathname === "/issues";
  const isBoardsActive =
    location.pathname.startsWith("/boards") ||
    location.pathname.startsWith("/board");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div>
          <Button type="link">
            <NavLink
              to="/issues"
              className={isIssuesActive ? "active-link" : ""}
            >
              Все задачи
            </NavLink>
          </Button>
          <Button type="link">
            <NavLink
              to="/boards"
              className={isBoardsActive ? "active-link" : ""}
            >
              Проекты
            </NavLink>
          </Button>
          <Button type="primary" onClick={showModal}>
            Создать задачу
          </Button>
        </div>
      </div>

      <CreateTaskModal visible={isModalVisible} onClose={handleCancel} />
    </header>
  );
};

export default Header;
