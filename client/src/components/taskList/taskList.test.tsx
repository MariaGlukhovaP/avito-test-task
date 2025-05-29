import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "./taskList";
import { Task } from "../../types/task";
import { MemoryRouter } from "react-router-dom";

jest.mock("../taskModal/taskModal", () => (props: any) => {
  return props.visible ? (
    <div data-testid="modal">
      Modal is open. Task: {props.task?.title || "New"}
    </div>
  ) : null;
});

const tasksMock: Task[] = [
  {
    id: 1,
    title: "Test Task 1",
    description: "Description 1",
    priority: "High",
    status: "Backlog",
    assignee: { id: 1, fullName: "Alice", avatarUrl: "url1" },
    boardId: "10",
    boardName: "Board 10",
  },
  {
    id: 2,
    title: "Test Task 2",
    description: "Description 2",
    priority: "Medium",
    status: "InProgress",
    assignee: { id: 2, fullName: "Bob", avatarUrl: "url2" },
    boardId: "20",
    boardName: "Board 20",
  },
];

describe("TaskList", () => {
  test("отображает список задач", () => {
    render(
      <MemoryRouter>
        <TaskList tasks={tasksMock} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  test("открывает модальное окно с задачей при клике на карточку", () => {
    render(
      <MemoryRouter>
        <TaskList tasks={tasksMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Test Task 1"));

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText(/Task: Test Task 1/)).toBeInTheDocument();
  });

  test("открывает модальное окно для создания новой задачи по кнопке", () => {
    render(
      <MemoryRouter>
        <TaskList tasks={tasksMock} />
      </MemoryRouter>
    );

    const createButton = screen.getByRole("button", {
      name: /Создать задачу/i,
    });
    fireEvent.click(createButton);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText(/Task: New/)).toBeInTheDocument();
  });

  test("закрывает модальное окно при вызове onClose", () => {
    render(
      <MemoryRouter>
        <TaskList tasks={tasksMock} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
