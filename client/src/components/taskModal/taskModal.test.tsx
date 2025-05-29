// В начале тестового файла
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateTaskModal from "./taskModal";
import { MemoryRouter } from "react-router-dom";

// Моки для хуков мутаций
const mockCreateTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockUpdateTaskStatus = jest.fn();

// Мокаем импорт хуков мутаций (путь замени на свой)
jest.mock("../../services/useMutateTask", () => ({
  useCreateTask: () => ({
    mutate: mockCreateTask,
    isPending: false,
  }),
  useUpdateTask: () => ({
    mutate: mockUpdateTask,
    isPending: false,
  }),
}));

jest.mock("../../services/useUpdateTaskStatus", () => ({
  useUpdateTaskStatus: () => ({
    mutate: mockUpdateTaskStatus,
  }),
}));

// Создаём QueryClient
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function renderWithClient(ui: React.ReactElement) {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

// Тест
describe("CreateTaskModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("обновляет задачу при отправке формы с task", async () => {
    const task = {
      id: 1,
      title: "Test Task",
      description: "Desc",
      priority: "High" as const,
      status: "Backlog" as const,
      assignee: { id: 1, fullName: "User One", avatarUrl: "url1" },
      boardId: "1",
      boardName: "Board One",
    };

    renderWithClient(
      <MemoryRouter>
        <CreateTaskModal
          visible={true}
          onClose={() => {}}
          task={task}
          boardId={task.boardId}
          boardName={task.boardName}
        />
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/Название/i);
    fireEvent.change(titleInput, { target: { value: "Updated Task" } });

    const submitButton = screen.getByRole("button", {
      name: /Обновить задачу/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalled();
    });
  });
});
