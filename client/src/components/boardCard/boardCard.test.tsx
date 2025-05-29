import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BoardCard from "./boardCard";
import { Board } from "../../types/board";

const board: Board = {
  id: 1,
  name: "Название доски",
  description: "Описание доски",
  taskCount: 5,
  tasks: [],
};

describe("BoardCard", () => {
  it("отображает заголовок, описание и количество задач", () => {
    render(
      <MemoryRouter>
        <BoardCard board={board} />
      </MemoryRouter>
    );

    expect(screen.getByText("Название доски")).toBeInTheDocument();
    expect(screen.getByText("Описание доски")).toBeInTheDocument();
    expect(screen.getByText(/Количество задач: 5/)).toBeInTheDocument();
  });

  it("содержит ссылку на страницу доски", () => {
    render(
      <MemoryRouter>
        <BoardCard board={board} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /перейти к доске/i });
    expect(link).toHaveAttribute("href", "/board/1");
  });
});
