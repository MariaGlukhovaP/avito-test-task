import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../types/task";

// Функция для получения задач пользователя по ID с сервера
const fetchUserTasks = async (
  userId: number,
  signal: AbortSignal
): Promise<Task[]> => {
  const response = await axios.get(
    `http://127.0.0.1:8080/api/v1/users/${userId}/tasks`,
    {
      signal, // Передаём сигнал отмены запроса
    }
  );
  return response.data.data; // Возвращаем данные задач
};

// Хук для получения задач пользователя с автоматическим обновлением данных
export const useUserTasks = (userId: number) => {
  return useQuery<Task[], Error>({
    queryKey: ["userTasks", userId], // Уникальный ключ запроса
    queryFn: ({ signal }) => fetchUserTasks(userId, signal), // Передаём сигнал в запрос
    enabled: !!userId, // Активируем запрос только при наличии userId
  });
};
