import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types/user";

// Функция для получения списка пользователей с сервера
const fetchUsers = async (signal: AbortSignal): Promise<User[]> => {
  const response = await axios.get("http://127.0.0.1:8080/api/v1/users", {
    signal, // Передаём сигнал отмены запроса
  });
  return response.data.data; // Возвращаем данные пользователей
};

// Хук для использования данных пользователей с кешированием и автоматическим обновлением
export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"], // Ключ для кеша
    queryFn: ({ signal }) => fetchUsers(signal), // Передаём signal в функцию запроса
  });
};
