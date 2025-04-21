import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Хук для создания/редактирования задачи с использованием React Query
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Функция для создания задачи
    mutationFn: async (taskData: any) => {
      const { data } = await axios.post(
        "http://127.0.0.1:8080/api/v1/tasks/create", // Отправка данных для создания задачи
        taskData
      );
      return data; // Возвращаем данные задачи
    },
    // После успешного создания задачи обновляем кеш запросов
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// Хук для обновления задачи с использованием React Query
export const useUpdateTask = (taskId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    // Функция для обновления задачи
    mutationFn: async (taskData: any) => {
      const { data } = await axios.put(
        `http://127.0.0.1:8080/api/v1/tasks/update/${taskId}`, // Отправка данных для обновления задачи по ID
        taskData
      );
      return data; // Возвращаем обновленные данные задачи
    },
    // После успешного обновления задачи обновляем кеш запросов
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
