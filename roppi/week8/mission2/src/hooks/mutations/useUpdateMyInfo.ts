import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { updateMy } from "../../apis/auth";

const useUpdateMyInfo = () => {
  return useMutation({
    mutationFn: updateMy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
      alert("프로필이 수정되었습니다!");
    },
    onError: (error) => {
      console.error("프로필 수정 실패:", error);
      alert("수정에 실패했습니다.");
    },
  });
};
export default useUpdateMyInfo
