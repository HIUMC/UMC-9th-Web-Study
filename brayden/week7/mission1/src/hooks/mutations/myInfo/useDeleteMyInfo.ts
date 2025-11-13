import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { deleteMyInfo } from "../../../apis/auth";

function useDeleteMyInfo() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: deleteMyInfo,

    onSuccess: () => {
      alert("회원 탈퇴가 완료되었습니다.");
      logout();
      navigate("/login");
    },
    onError: () => alert("회원 탈퇴가 실패했습니다. "),
  });
}

export default useDeleteMyInfo;
