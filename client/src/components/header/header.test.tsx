import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./header";

jest.mock("../taskModal/taskModal", () => ({ visible, onClose }: any) => {
  return visible ? (
    <div data-testid="modal">
      <button onClick={onClose}>Закрыть</button>
    </div>
  ) : null;
});

describe("Header", () => {
  it("рендерит навигацию и кнопку создания задачи", () => {
    render(
      <MemoryRouter initialEntries={["/issues"]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Все задачи")).toBeInTheDocument();
    expect(screen.getByText("Проекты")).toBeInTheDocument();
    expect(screen.getByText("Создать задачу")).toBeInTheDocument();
  });

  it("открывает модалку по кнопке 'Создать задачу'", () => {
    render(
      <MemoryRouter>
        <Header boardId="1" boardName="Test Board" />
      </MemoryRouter>
    );

    const button = screen.getByText("Создать задачу");
    fireEvent.click(button);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("закрывает модалку при нажатии кнопки 'Закрыть'", () => {
    render(
      <MemoryRouter>
        <Header boardId="1" boardName="Test Board" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Создать задачу"));
    const closeBtn = screen.getByText("Закрыть");
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
