import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";

export const usePostLp = () => {
  return useMutation({
    mutationFn: postLp,
  });
};
