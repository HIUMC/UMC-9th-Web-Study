import { Link, useNavigate } from "react-router-dom";
import useDeleteUser from "../hooks/mutations/useDeleteUser";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY, QUERY_KEY } from "../constants/key";
import { queryClient } from "../App";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { removeItem: removeAccessTokenFromStorage, setItem: setAccessToken } =
    useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    removeItem: removeRefreshTokenFromStorage,
    setItem: setRefreshToken,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const navigate = useNavigate();
  const { mutate: deleteMutate } = useDeleteUser();

  const handleDeleteUser = () => {
    if (
      window.confirm("정말 탈퇴하시겠습니까? 모든 정보가 영구히 삭제됩니다.")
    ) {
      deleteMutate(undefined, {
        onSuccess: () => {
          removeAccessTokenFromStorage();
          removeRefreshTokenFromStorage();
          setAccessToken(null);
          setRefreshToken(null);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.users],
          });
          console.log("탈퇴 성공");
          navigate("/");
          onClose();
        },
      });
    }
  };

  const sidebarContent = (
    <>
      <div className="p-4 flex flex-col justify-between h-full font-bold">
        <div>
          <Link
            to="/search"
            className="block py-2 text-white hover:text-blue-500"
            onClick={onClose} // 3. 모바일에서 링크 클릭 시 사이드바 닫기
          >
            검색
          </Link>
          <Link
            to="/my"
            className="block py-2 text-white hover:text-blue-500"
            onClick={onClose}
          >
            마이페이지
          </Link>
        </div>
        <div>
          <button
            onClick={handleDeleteUser}
            className="block py-2 text-white hover:text-blue-500 cursor-pointer"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* --- 4. 모바일용 사이드바 (슬라이드 오버레이) --- */}
      <div
        className={`fixed top-25 h-full z-20 md:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 w-dvh  bg-opacity-50"
          onClick={onClose}
        ></div>

        {/* 4-2. 실제 사이드바 */}
        <div
          className={`relative bg-gray-900 w-56 h-full shadow-xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </div>
      </div>

      {/* --- 5. 데스크톱용 사이드바 (고정) --- */}
      <div className="hidden md:block w-56 bg-gray-900 h-full overflow-y-auto shadow">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
