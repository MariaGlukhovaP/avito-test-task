import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user";

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("http://127.0.0.1:8080/api/v1/users");
  const data = await res.json();
  return data.data;
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
