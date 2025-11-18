import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";
import { useDeleteAccountMutation } from "../hooks/mutations/useDeleteAccountMutation";
import { LOCAL_STORAGE_KEY } from "../constants/key";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteAccountMutation = useDeleteAccountMutation();

  const handleDeleteAccount = async () => {
    deleteAccountMutation.mutate(undefined, {
      onSuccess: () => {
        alert("회원탈퇴가 완료되었습니다.");
        setIsDeleteModalOpen(false);
        // 회원탈퇴 후에는 계정이 이미 삭제되어 로그아웃 API 호출이 실패하므로
        // 로컬에서만 토큰을 삭제
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
        navigate("/login");
      },
      onError: (error) => {
        console.error("회원탈퇴 오류:", error);
        alert("회원탈퇴에 실패했습니다.");
      }
    });
  };

  return (
    <>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm ${open ? "" : "hidden"}`}
        onClick={onClose} // 바깥 클릭 시 닫힌다.
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64
                    bg-zinc-950 border-r border-white/10 p-4
                    transition-transform duration-200 ease-out text-white
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex h-full flex-col justify-between text-sm">
            <div className="space-y-1">
                <button
                    onClick={() => {
                        onClose();
                        navigate("/search");
                    }}
                    className="block w-full text-left text-white/90 rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white"
                >
                    찾기
                </button>
                <button
                    onClick={() => {
                        onClose();
                        navigate(accessToken ? "/my" : "/login");
                    }}
                    className="block w-full text-left text-white/90 rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white"
                >
                    마이페이지
                </button>
            </div>
            <div className="pt-3 border-t border-white/10">
                <button
                    onClick={() => {
                        setIsDeleteModalOpen(true);
                        onClose(); // 탈퇴 모달을 열 때 사이드바 닫기
                    }}
                    className="block w-full text-left text-white/90 rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white"
                >
                    탈퇴하기
                </button>
            </div>
        </nav>
      </aside>
    </>
  );
}
export default Sidebar;
