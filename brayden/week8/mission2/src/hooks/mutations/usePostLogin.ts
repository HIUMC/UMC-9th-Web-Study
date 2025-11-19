// hooks/mutations/usePostSignIn.ts
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";

function usePostLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // 내 정보 캐시 갱신
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default usePostLogin;
