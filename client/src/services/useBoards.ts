import { useQuery } from "@tanstack/react-query";
import { Board } from "../types/board";

// Функция для получения списка досок
const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch("http://localhost:8080/api/v1/boards");
  const data = await response.json();
  return data.data; // Возвращаем список досок
};

// Хук для получения списка досок с использованием React Query
export const useBoards = () => {
  return useQuery<Board[]>({
    queryKey: ["boards"], // Ключ запроса
    queryFn: fetchBoards, // Функция для получения данных
  });
};
