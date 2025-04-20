import { Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import CreateTaskModal from "../taskModal/taskModal";

interface HeaderProps {
  boardName?: string;
  boardId?: number;
}

const Header: React.FC<HeaderProps> = ({ boardName, boardId }) => {
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
        </div>
        <Button type="primary" onClick={showModal}>
          Создать задачу
        </Button>
        <CreateTaskModal
          visible={isModalVisible}
          onClose={handleCancel}
          boardName={boardName}
          boardId={boardId}
        />
      </div>
    </header>
  );
};

export default Header;
