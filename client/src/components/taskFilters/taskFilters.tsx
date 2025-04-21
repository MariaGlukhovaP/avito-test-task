import { Select, Input } from "antd";
const { Option } = Select;
import { useEffect, useState } from "react";
import { useBoards } from "../../services/useBoards";
import { Filters } from "../../types/filters";
import "./taskFilters.css";

// Компонент фильтров для задач: поиск, фильтрация по статусу, доске и исполнителю
const TaskFilters: React.FC<{ onFilterChange: (filters: Filters) => void }> = ({
  onFilterChange,
}) => {
  // Локальное состояние фильтров
  const [filters, setFilters] = useState<Filters>({
    searchTitle: "",
    status: "",
    boardId: "",
    assignee: "",
  });

  // Получение списка досок с сервера
  const { data: boards = [], isLoading: boardsLoading } = useBoards();

  // Передача обновлённых фильтров в родительский компонент
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Обновление конкретного поля фильтра
  const handleChange = (field: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="filter-container">
      <Input
        className="search"
        placeholder="Поиск по названию задачи"
        value={filters.searchTitle}
        onChange={(e) => handleChange("searchTitle", e.target.value)}
      />
      <div className="filters-container">
        <Select
          placeholder="Выберите фильтр"
          // Кастомный выпадающий список со встроенными полями фильтрации
          dropdownRender={(menu) => (
            <div className="sections">
              {/* Фильтр по статусу задачи */}
              <Select
                placeholder="Выберите статус"
                value={filters.status}
                onChange={(value) => handleChange("status", value)}
              >
                <Option value="">Все статусы</Option>
                <Option value="Backlog">To Do</Option>
                <Option value="InProgress">In Progress</Option>
                <Option value="Done">Done</Option>
              </Select>
              {/* Фильтр по доске */}
              <Select
                placeholder="Выберите доску"
                value={filters.boardId}
                onChange={(value) => handleChange("boardId", value)}
                loading={boardsLoading}
              >
                <Option value="">Все доски</Option>
                {boards.map((board) => (
                  <Option key={board.id} value={String(board.id)}>
                    {board.name}
                  </Option>
                ))}
              </Select>
              {/* Фильтр по исполнителю */}
              <Input
                placeholder="Поиск по исполнителю"
                value={filters.assignee}
                onChange={(e) => handleChange("assignee", e.target.value)}
              />
              {menu}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default TaskFilters;
