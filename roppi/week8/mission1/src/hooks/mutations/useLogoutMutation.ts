import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: postLogout,
  });
}

export default useLogoutMutation;