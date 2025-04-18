import { useQuery } from "@tanstack/react-query";
import { Issue } from "../types/issue";

const fetchUserTasks = async (userId: number): Promise<Issue[]> => {
  const res = await fetch(`http://127.0.0.1:8080/api/v1/users/${userId}/tasks`);
  const data = await res.json();
  return data.data;
};

export const useUserTasks = (userId: number) => {
  return useQuery<Issue[]>({
    queryKey: ["userTasks", userId],
    queryFn: () => fetchUserTasks(userId),
    enabled: !!userId,
  });
};
