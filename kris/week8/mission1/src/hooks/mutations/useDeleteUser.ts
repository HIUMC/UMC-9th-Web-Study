import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../apis/auth";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

function useDeleteUser() {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error("회원 탈퇴 오류", error);
      alert("회원 탈퇴에 실패했습니다.");
    }
  })
}

export default useDeleteUser;