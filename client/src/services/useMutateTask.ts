import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: any) => {
      const { data } = await axios.post(
        "http://127.0.0.1:8080/api/v1/tasks/create",
        taskData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = (taskId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: any) => {
      const { data } = await axios.put(
        `http://127.0.0.1:8080/api/v1/tasks/update/${taskId}`,
        taskData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
