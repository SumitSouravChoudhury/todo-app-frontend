import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useGet = (queryKey, url, options = {}) => {
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => api.get(url),
    staleTime: 0,
    gcTime: 0,
    ...options,
  });
};
