import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateTaskStatus = (taskId: number, boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: string) => {
      const { data } = await axios.put(
        `http://127.0.0.1:8080/api/v1/tasks/updateStatus/${taskId}`,
        { status }
      );
      return data;
    },
    onSuccess: () => {
      console.log(boardId);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
  });
};
