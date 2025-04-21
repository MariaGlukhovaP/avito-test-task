import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../types/task";

// Функция для получения задач доски по ID с поддержкой отмены
const fetchBoard = async (id: string, signal: AbortSignal): Promise<Task[]> => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/boards/${id}`,
    {
      signal, // передаем сигнал отмены запроса
    }
  );
  return response.data.data; // Возвращаем задачи доски
};

// Хук для получения задач доски с использованием React Query
export const useBoard = (id: string) => {
  return useQuery<Task[], Error>({
    queryKey: ["board", id],
    queryFn: ({ signal }) => fetchBoard(id, signal), // передаем сигнал отмены запроса
  });
};
