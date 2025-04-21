import { useQuery } from "@tanstack/react-query";
import { Task } from "../types/task";

// Функция для получения задач доски по ID
const fetchBoard = async (id: string): Promise<Task[]> => {
  const response = await fetch(`http://localhost:8080/api/v1/boards/${id}`);
  const data = await response.json();
  return data.data; // Возвращаем задачи доски
};

// Хук для получения задач доски с использованием React Query
export const useBoard = (id: string) => {
  return useQuery<Task[]>({
    queryKey: ["board", id], // Ключ запроса
    queryFn: () => fetchBoard(id), // Функция для получения данных
  });
};
