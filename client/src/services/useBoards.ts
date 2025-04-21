import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Board } from "../types/board";

// Функция для получения списка досок с поддержкой отмены
const fetchBoards = async (signal: AbortSignal): Promise<Board[]> => {
  const response = await axios.get("http://localhost:8080/api/v1/boards", {
    signal, // передаём сигнал отмены запроса
  });
  return response.data.data; // Возвращаем список досок
};

// Хук для получения списка досок с использованием React Query
export const useBoards = () => {
  return useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: ({ signal }) => fetchBoards(signal), // передаём сигнал отмены запроса
  });
};
