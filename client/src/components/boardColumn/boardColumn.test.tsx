import { render, screen, fireEvent } from "@testing-library/react";
import { Task } from "../../types/task";
import BoardColumn from "./boardColumn";

jest.mock("../../services/useTasks", () => ({
  useTasks: () => ({
    data: [
      {
        id: 1,
        title: "Task 1",
        description: "",
        priority: "Low",
        status: "Backlog",
        assignee: { id: 1, name: "User1" },
        boardId: "1",
        boardName: "Board 1",
      },
      {
        id: 2,
        title: "Task 2",
        description: "",
        priority: "Medium",
        status: "Backlog",
        assignee: { id: 2, name: "User2" },
        boardId: "1",
        boardName: "Board 1",
      },
    ],
  }),
}));

jest.mock("../taskCard/taskCard", () => (props: any) => {
  return (
    <div data-testid="task-card" onClick={props.onClick}>
      {props.task.title}
    </div>
  );
});

jest.mock("../taskModal/taskModal", () => (props: any) => {
  return (
    <div data-testid="task-modal" hidden={!props.visible}>
      Modal for task: {props.task ? props.task.title : "none"}
    </div>
  );
});

const tasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "",
    priority: "Low",
    status: "Backlog",
    assignee: { id: 1, fullName: "User1", avatarUrl: "#" },
    boardId: "1",
    boardName: "Board 1",
  },
  {
    id: 2,
    title: "Task 2",
    description: "",
    priority: "Medium",
    status: "Backlog",
    assignee: { id: 2, fullName: "User2", avatarUrl: "#" },
    boardId: "1",
    boardName: "Board 1",
  },
];

describe("BoardColumn", () => {
  it("рендерит заголовок", () => {
    render(<BoardColumn title="To Do" tasks={tasks} />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
  });

  it("рендерит задачи через TaskCard", () => {
    render(<BoardColumn title="To Do" tasks={tasks} />);
    const taskCards = screen.getAllByTestId("task-card");
    expect(taskCards).toHaveLength(2);
    expect(taskCards[0]).toHaveTextContent("Task 1");
    expect(taskCards[1]).toHaveTextContent("Task 2");
  });

  it("показывает emptyText, если задач нет", () => {
    render(<BoardColumn title="Empty" tasks={[]} emptyText="Нет задач" />);
    expect(screen.getByText("Нет задач")).toBeInTheDocument();
  });

  it("открывает модалку с выбранной задачей при клике на задачу", () => {
    render(<BoardColumn title="To Do" tasks={tasks} />);
    const taskCards = screen.getAllByTestId("task-card");

    expect(screen.getByTestId("task-modal")).toHaveAttribute("hidden");

    fireEvent.click(taskCards[0]);

    expect(screen.getByTestId("task-modal")).not.toHaveAttribute("hidden");
    expect(screen.getByTestId("task-modal")).toHaveTextContent(
      "Modal for task: Task 1"
    );
  });
});
