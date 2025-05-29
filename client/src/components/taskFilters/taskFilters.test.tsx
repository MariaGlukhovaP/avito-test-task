import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskFilters from "./taskFilters";

const boardsMock = [
  { id: 1, name: "Board 1" },
  { id: 2, name: "Board 2" },
];

jest.mock("../../services/useBoards", () => ({
  useBoards: () => ({
    data: boardsMock,
    isLoading: false,
  }),
}));

describe("TaskFilters", () => {
  const onFilterChangeMock = jest.fn();

  beforeEach(() => {
    onFilterChangeMock.mockClear();
  });

  test("отображает инпут для поиска по названию задачи", () => {
    render(<TaskFilters onFilterChange={onFilterChangeMock} />);
    const input = screen.getByPlaceholderText("Поиск по названию задачи");
    expect(input).toBeInTheDocument();
  });

  test("выбор доски обновляет фильтр", async () => {
    render(<TaskFilters onFilterChange={onFilterChangeMock} />);

    const mainSelect = screen.getByRole("combobox");

    fireEvent.mouseDown(mainSelect);

    const selects = screen.getAllByRole("combobox");
    const boardSelect = selects[2];

    fireEvent.mouseDown(boardSelect);

    const option = screen.getByText("Board 2");
    fireEvent.click(option);

    await waitFor(() =>
      expect(onFilterChangeMock).toHaveBeenLastCalledWith(
        expect.objectContaining({ boardId: "2" })
      )
    );
  });

  test("поиск по названию обновляет фильтр", () => {
    render(<TaskFilters onFilterChange={onFilterChangeMock} />);
    const input = screen.getByPlaceholderText("Поиск по названию задачи");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onFilterChangeMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ searchTitle: "test" })
    );
  });

  test("выбор статуса обновляет фильтр", async () => {
    render(<TaskFilters onFilterChange={onFilterChangeMock} />);
    const mainSelect = screen.getByRole("combobox");
    fireEvent.mouseDown(mainSelect);

    const selects = screen.getAllByRole("combobox");
    const statusSelect = selects[1];
    fireEvent.mouseDown(statusSelect);

    const option = screen.getByText("In Progress");
    fireEvent.click(option);

    await waitFor(() =>
      expect(onFilterChangeMock).toHaveBeenLastCalledWith(
        expect.objectContaining({ status: "InProgress" })
      )
    );
  });

  test("поиск по исполнителю обновляет фильтр", () => {
    render(<TaskFilters onFilterChange={onFilterChangeMock} />);
    const mainSelect = screen.getByRole("combobox");
    fireEvent.mouseDown(mainSelect);

    const inputAssignee = screen.getByPlaceholderText("Поиск по исполнителю");
    fireEvent.change(inputAssignee, { target: { value: "Alice" } });
    expect(onFilterChangeMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ assignee: "Alice" })
    );
  });
});
