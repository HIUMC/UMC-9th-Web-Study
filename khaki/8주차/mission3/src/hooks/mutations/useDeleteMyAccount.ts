import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { deleteMyAccount } from "../../apis/user";
import { useAuth } from "../../context/AuthContext";

function useDeleteMyAccount() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: deleteMyAccount,

    // data: 서버에서 반환된 응답 데이터
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onSuccess: (data) => {
      console.log(data, "계정 탈퇴 성공");
      alert("계정이 성공적으로 탈퇴되었습니다.");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
      logout();
    },

    // error: 발생한 에러 객체
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onError: (error) => {
      console.log("계정 탈퇴 실패:", error);
    },
  });
}

export default useDeleteMyAccount;
