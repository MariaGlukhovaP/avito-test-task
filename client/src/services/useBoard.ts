import { useQuery } from "@tanstack/react-query";
import { Issue } from "../types/issue";

const fetchBoard = async (id: string): Promise<Issue[]> => {
  const response = await fetch(`http://localhost:8080/api/v1/boards/${id}`);
  const data = await response.json();
  return data.data; // это массив задач
};

export const useBoard = (id: string) => {
  return useQuery<Issue[]>({
    queryKey: ["board", id],
    queryFn: () => fetchBoard(id),
  });
};
