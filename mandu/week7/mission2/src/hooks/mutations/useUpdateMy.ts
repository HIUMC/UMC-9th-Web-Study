import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key"; // (key.ts에 myInfo 키가 있다고 가정)
import { updateMy } from "../../apis/auth";
import { queryClient } from "../../App";

function useUpdateMyInfo() {
  return useMutation({
    mutationFn: updateMy,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
      console.log("사용자 정보 수정 성공");
    },
    onError: (error) => {
      console.error("사용자 정보 수정 실패:", error);
      alert("정보 수정에 실패했습니다.");
    },
  });
}

export default useUpdateMyInfo;
