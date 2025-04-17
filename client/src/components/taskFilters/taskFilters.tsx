import React from "react";
import { Select, Input } from "antd";
import { useDispatch } from "react-redux";
import { setFilter } from "../../store/slices/issuesSlice";
const { Option } = Select;
import "./taskFilters.css";

const TaskFilters: React.FC = () => {
  const dispatch = useDispatch();

  const handleStatusChange = (value: string) => {
    dispatch(setFilter({ status: value }));
  };

  const handleBoardChange = (value: string) => {
    dispatch(setFilter({ boardId: parseInt(value) || null }));
  };

  const handleSearchTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ searchTitle: e.target.value }));
  };

  const handleSearchExecutorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setFilter({ searchExecutor: e.target.value }));
  };

  return (
    <div className="contaier">
      <Input
        placeholder="Поиск по названию задачи"
        onChange={handleSearchTitleChange}
        className="search"
      />
      <div className="filters-container">
        <Select
          placeholder="Выберите фильтр"
          style={{ width: "100%" }}
          dropdownRender={(menu) => (
            <div className="sections">
              <div className="filter-section">
                <Select
                  placeholder="Выберите статус"
                  onChange={handleStatusChange}
                >
                  <Option value="">Все статусы</Option>
                  <Option value="open">Открыта</Option>
                  <Option value="in_progress">В процессе</Option>
                  <Option value="closed">Закрыта</Option>
                </Select>
              </div>
              <div className="filter-section">
                <Select
                  placeholder="Выберите доску"
                  style={{ width: "100%" }}
                  onChange={handleBoardChange}
                >
                  <Option value="">Все доски</Option>
                </Select>
              </div>
              <div className="filter-section">
                <Input
                  placeholder="Поиск по исполнителю"
                  onChange={handleSearchExecutorChange}
                />
              </div>
              {menu}
            </div>
          )}
        ></Select>
      </div>
    </div>
  );
};

export default TaskFilters;
