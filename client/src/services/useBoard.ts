import { useQuery } from "@tanstack/react-query";
import { Board } from "../types/board";

const fetchBoard = async (id: string): Promise<Board> => {
  const response = await fetch(`http://localhost:8080/api/v1/boards/${id}`);
  const data = await response.json();
  return data;
};

export const useBoard = (id: string) => {
  return useQuery<Board>({
    queryKey: ["board", id],
    queryFn: () => fetchBoard(id),
  });
};
