import { useMutation } from "@tanstack/react-query";
import { postLP } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLp() {
  return useMutation({
    mutationFn: postLP,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
        exact: true,
      });
      console.log("LP 등록 성공", data);
    },
    onError: (error) => {
      console.error("LP 등록 실패:", error);
      alert("LP 등록에 실패했습니다.");
    },
  });
}

export default usePostLp;
