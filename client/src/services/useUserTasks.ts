import { useQuery } from "@tanstack/react-query";
import { Task } from "../types/task";

// Функция для получения задач пользователя по ID с сервера
const fetchUserTasks = async (userId: number): Promise<Task[]> => {
  const res = await fetch(`http://127.0.0.1:8080/api/v1/users/${userId}/tasks`); // Запрос задач пользователя по ID
  const data = await res.json(); // Парсинг ответа в JSON
  return data.data; // Возвращаем данные задач
};

// Хук для получения задач пользователя с автоматическим обновлением данных
export const useUserTasks = (userId: number) => {
  return useQuery<Task[]>({
    queryKey: ["userTasks", userId], // Ключ запроса с уникальной комбинацией userTasks и ID пользователя
    queryFn: () => fetchUserTasks(userId), // Функция для получения задач
    enabled: !!userId, // Включает запрос, только если userId не равен null или undefined
  });
};
