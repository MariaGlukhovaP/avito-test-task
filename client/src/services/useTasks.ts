import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../types/task";

// Функция для получения задач с сервера
const fetchTasks = async (signal: AbortSignal): Promise<Task[]> => {
  const response = await axios.get("http://127.0.0.1:8080/api/v1/tasks", {
    signal, // Передаём сигнал отмены запроса
  });
  return response.data.data; // Возвращаем данные задач
};

// Хук для получения задач с использованием React Query
export const useTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: ({ signal }) => fetchTasks(signal), // Передаём signal из React Query
  });
};
