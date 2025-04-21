import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Хук для обновления статуса задачи
export const useUpdateTaskStatus = (taskId: number, boardId: string) => {
  const queryClient = useQueryClient(); // Хук для работы с кешем React Query

  return useMutation({
    mutationFn: async (status: string) => {
      // Запрос на обновление статуса задачи
      const { data } = await axios.put(
        `http://127.0.0.1:8080/api/v1/tasks/updateStatus/${taskId}`, // URL для обновления статуса задачи
        { status } // Отправляем новый статус задачи
      );
      return data; // Возвращаем данные ответа
    },
    onSuccess: () => {
      // Очистка кеша после успешного обновления
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
  });
};
