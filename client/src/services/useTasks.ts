import { useQuery } from "@tanstack/react-query";
import { Task } from "../types/task";

// Функция для получения задач с сервера
const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch("http://127.0.0.1:8080/api/v1/tasks"); // Запрос к API для получения списка задач
  const data = await res.json(); // Преобразование ответа в формат JSON
  return data.data; // Возвращаем данные задач
};

// Хук для получения задач с использованием React Query
export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
};
