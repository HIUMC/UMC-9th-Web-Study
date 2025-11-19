import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/auth";
import { queryClient } from "../../App";

const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.clear();
      console.log("회원 탈퇴 성공");
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다.");
    },
  });
}

export default useDeleteUser;