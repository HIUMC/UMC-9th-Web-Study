import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";

function useLoginMutation() {
  return useMutation({
    mutationFn: postSignin,
  });
}

export default useLoginMutation;
