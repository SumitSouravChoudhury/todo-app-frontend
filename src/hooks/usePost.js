import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export const usePost = (url, options = {}) => {
  const queryClient = useQueryClient();
  const { invalidateKeys, onSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: (body) => api.post(url, body),
    onSuccess: (data, variables, context) => {
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      }
      onSuccess?.(data, variables, context);
    },
    ...restOptions,
  });
};
