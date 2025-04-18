import { Select, Input, Spin } from "antd";
const { Option } = Select;
import { useState } from "react";

import { useBoards } from "../../services/useBoards";
import "./taskFilters.css";

const TaskFilters: React.FC<{ onFilterChange: (filters: any) => void }> = ({
  onFilterChange,
}) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [status, setStatus] = useState("");
  const [boardId, setBoardId] = useState("");
  const [assignee, setAssignee] = useState("");

  const { data: boards = [], isLoading: boardsLoading } = useBoards();

  const handleFilterChange = () => {
    onFilterChange({ searchTitle, status, boardId, assignee });
  };

  return (
    <div className="filter-container">
      <Input
        className="search"
        placeholder="Поиск по названию задачи"
        value={searchTitle}
        onChange={(e) => {
          setSearchTitle(e.target.value);
          handleFilterChange();
        }}
      />
      <div className="filters-container">
        <Select
          placeholder="Выберите фильтр"
          dropdownRender={(menu) => (
            <div className="sections">
              <Select
                placeholder="Выберите статус"
                value={status}
                onChange={(value) => {
                  setStatus(value);
                  handleFilterChange();
                }}
              >
                <Option value="">Все статусы</Option>
                <Option value="open">To do</Option>
                <Option value="in_progress">In Progress</Option>
                <Option value="closed">Done</Option>
              </Select>
              <Select
                placeholder="Выберите доску"
                value={boardId}
                onChange={(value) => {
                  setBoardId(value);
                  handleFilterChange();
                }}
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
                value={assignee}
                onChange={(e) => {
                  setAssignee(e.target.value);
                  handleFilterChange();
                }}
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
