import { Select, Input, Spin } from "antd";
const { Option } = Select;
import { useEffect, useState } from "react";
import { useBoards } from "../../services/useBoards";
import "./taskFilters.css";
import { Filters } from "../../types/filters";

const TaskFilters: React.FC<{ onFilterChange: (filters: Filters) => void }> = ({
  onFilterChange,
}) => {
  const [filters, setFilters] = useState<Filters>({
    searchTitle: "",
    status: "",
    boardId: "",
    assignee: "",
  });

  const { data: boards = [], isLoading: boardsLoading } = useBoards();

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

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
          dropdownRender={(menu) => (
            <div className="sections">
              <Select
                placeholder="Выберите статус"
                value={filters.status}
                onChange={(value) => handleChange("status", value)}
              >
                <Option value="">Все статусы</Option>
                <Option value="Open">To do</Option>
                <Option value="InProgress">In Progress</Option>
                <Option value="Closed">Done</Option>
                <Option value="Backlog">Backlog</Option>
              </Select>
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
