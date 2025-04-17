import { Select, Input } from "antd";
const { Option } = Select;
import { useState } from "react";
import "./taskFilters.css";
import classNames from "classnames";

const TaskFilters: React.FC<{ onFilterChange: (filters: any) => void }> = ({
  onFilterChange,
}) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [status, setStatus] = useState("");
  const [boardId, setBoardId] = useState("");
  const [assignee, setAssignee] = useState("");

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
                <Option value="open">Открыта</Option>
                <Option value="in_progress">В процессе</Option>
                <Option value="closed">Закрыта</Option>
              </Select>
              <Select
                placeholder="Выберите доску"
                value={boardId}
                onChange={(value) => {
                  setBoardId(value);
                  handleFilterChange();
                }}
              >
                <Option value="">Все доски</Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
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
        ></Select>
      </div>
    </div>
  );
};

export default TaskFilters;
