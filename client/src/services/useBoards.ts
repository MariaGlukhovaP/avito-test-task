import { useQuery } from "@tanstack/react-query";
import { Board } from "../types/board";

const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch("http://localhost:8080/api/v1/boards");
  const data = await response.json();
  return data.data;
};

export const useBoards = () => {
  return useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });
};
