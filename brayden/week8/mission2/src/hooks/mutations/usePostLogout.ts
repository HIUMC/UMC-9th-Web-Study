import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default usePostLogout;
