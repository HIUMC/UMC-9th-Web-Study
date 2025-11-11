import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useDeleteUser from "../hooks/mutations/useDeleteUser";
import { useMutation } from "@tanstack/react-query";


const Sidebar = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 회원탈퇴
  const deleteUserMutation = useDeleteUser();

  const handleDeleteAccount = () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteUserMutation.mutate(undefined, {
      onSuccess: () => {
        setAccessToken(null);
        navigate("/login");
      },
    });
    setIsConfirmOpen(false);
  };

  const cancelDelete = () => setIsConfirmOpen(false);

 

  return (
    <>
      {/* overlay 배경 */}
      <div
        className={`
          fixed inset-0 transition-opacity duration-300
          ${isOpen ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* 실제 사이드바 */}
      <div
        className={`
          fixed top-[50px] left-0 w-[250px] h-full bg-[rgb(34,34,34)] text-white p-4 shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="text-sm w-full text-gray-400 mb-4 text-right cursor-pointer"
        >
          ✖
        </button>

        <div className="flex flex-col gap-4 text-[13px]">
          <ul className="space-y-3 font-semibold">
            <li>찾기</li>
            <Link to="/my">마이페이지</Link>
          </ul>

          <div
            onClick={handleDeleteAccount}
            className="cursor-pointer mt-4"
          >
            탈퇴하기
          </div>
        </div>
      </div>

      {/* 회원탈퇴 확인 모달 */}
      {isConfirmOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
        >
          <div className="bg-[#202020] p-6 rounded shadow-lg flex flex-col gap-4 w-[300px] text-white">
            <p className="text-center text-sm font-semibold">
              정말로 회원 탈퇴하시겠습니까?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={confirmDelete}
                className="px-4 py-1 bg-[#e52582] rounded hover:opacity-80 cursor-pointer"
              >
                예
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-1 bg-gray-500 rounded hover:opacity-80 cursor-pointer"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
