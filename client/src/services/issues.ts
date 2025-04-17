import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import { useAppSelector } from "../hooks/useRedux";
import { Issue } from "./../types/issue";

interface Filters {
  status?: string;
  boardId?: number | null;
  searchTitle?: string;
  searchExecutor?: string;
}

const fetchIssues = async (filters: Filters) => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "" && v !== null)
  );
  const { data } = await axios.get("/tasks", { params: cleanFilters });
  return data.data;
};

export const useIssuesQuery = () => {
  const filters = useAppSelector((state) => state.issues.filters);

  return useQuery<Issue[], Error>({
    queryKey: ["issues", filters],
    queryFn: () => fetchIssues(filters),
  });
};
