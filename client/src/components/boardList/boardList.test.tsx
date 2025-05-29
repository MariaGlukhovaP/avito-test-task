import { render, screen } from "@testing-library/react";
import BoardList from "./boardList";
import { Board } from "../../types/board";

// Мокаем компонент BoardCard
jest.mock("../boardCard/boardCard", () => () => (
  <div data-testid="board-card">Mocked BoardCard</div>
));

describe("BoardList", () => {
  it("рендерит карточки досок", () => {
    const boards: Board[] = [
      {
        id: 1,
        name: "Доска 1",
        description: "Описание 1",
        taskCount: 5,
        tasks: [],
      },
      {
        id: 2,
        name: "Доска 2",
        description: "Описание 2",
        taskCount: 3,
        tasks: [],
      },
    ];

    render(<BoardList boards={boards} />);
    const boardCards = screen.getAllByTestId("board-card");
    expect(boardCards).toHaveLength(2);
  });

  it("рендерит пустой контейнер, если досок нет", () => {
    render(<BoardList boards={[]} />);
    const container = screen.getByTestId("board-list");
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });
});
