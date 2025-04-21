import { Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import CreateTaskModal from "../taskModal/taskModal";
import { HeaderProps } from "../../types/headerProps";

// Шапка приложения с навигацией и кнопкой создания задачи
const Header: React.FC<HeaderProps> = ({ boardName, boardId }) => {
  const location = useLocation();

  // Состояние управления отображением модального окна создания задачи
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Определение активной вкладки для подсветки текущего маршрута
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
          {/* Навигационные кнопки с подсветкой активной страницы */}
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

        {/* Кнопка открытия модального окна для создания задачи */}
        <Button type="primary" onClick={showModal}>
          Создать задачу
        </Button>

        {/* Модадбное окно создания задачи с привязкой к текущей доске */}
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
