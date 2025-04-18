import { useQuery } from "@tanstack/react-query";
import { Issue } from "../types/issue";

const fetchTasks = async (): Promise<Issue[]> => {
  const res = await fetch("http://127.0.0.1:8080/api/v1/tasks");
  const data = await res.json();
  return data.data;
};

export const useTasks = () => {
  return useQuery<Issue[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
};
