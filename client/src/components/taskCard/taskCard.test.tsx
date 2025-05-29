// TaskCard.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskCard from "./taskCard";
import { TaskCardProps } from "../../types/taskCardProps";

const mockTask: TaskCardProps["task"] = {
  id: 1,
  title: "Тестовая задача",
  description: "Описание задачи",
  priority: "High",
  status: "Backlog",
  assignee: {
    id: 1,
    fullName: "Иван Иванов",
    avatarUrl: "https://example.com/avatar.jpg",
  },
  boardId: "123",
  boardName: "Проект А",
};

describe("TaskCard", () => {
  it("отображает заголовок, описание, статус, приоритет, исполнителя и доску", () => {
    render(
      <MemoryRouter initialEntries={["/issues"]}>
        <TaskCard task={mockTask} />
      </MemoryRouter>
    );

    expect(screen.getByText("Тестовая задача")).toBeInTheDocument();
    expect(screen.getByText("Описание задачи")).toBeInTheDocument();
    expect(screen.getByText("Backlog")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Иван Иванов")).toBeInTheDocument();
    expect(screen.getByText("Проект А")).toBeInTheDocument();
    expect(screen.getByText("Перейти к доске")).toBeInTheDocument();
  });

  it("не отображает ссылку 'Перейти к доске' на странице доски", () => {
    render(
      <MemoryRouter initialEntries={["/board/123"]}>
        <TaskCard task={mockTask} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Перейти к доске")).not.toBeInTheDocument();
  });
});
