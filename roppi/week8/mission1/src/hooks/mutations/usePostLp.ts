import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import type { RequestPostLpDto } from "../../types/lp";

export const usePostLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: RequestPostLpDto) => postLp(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },
  });
};
