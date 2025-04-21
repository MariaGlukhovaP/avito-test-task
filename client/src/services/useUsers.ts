import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user";

// Функция для получения списка пользователей с сервера
const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("http://127.0.0.1:8080/api/v1/users"); // Запрос на получение пользователей
  const data = await res.json(); // Парсинг ответа в JSON
  return data.data; // Возвращаем данные пользователей
};

// Хук для использования данных пользователей с кешированием и автоматическим обновлением
export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"], // Ключ для запроса, использующийся в кеше
    queryFn: fetchUsers, // Функция для получения данных пользователей
  });
};
