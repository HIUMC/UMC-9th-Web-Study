import { Search, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  isClosed: boolean;
}

const Sidebar = ({ isClosed }: SidebarProps) => {
  const { accessToken } = useAuth();

  return (
    <aside
      className={`
        bg-gray-900 text-white h-full
        fixed top-[64px] bottom-[64px] left-0
        flex flex-col transition-all duration-300
        ${isClosed ? "w-0 p-0 overflow-hidden" : "w-[15%] p-4"}
      `}
    >
      {/* 상단 메뉴 영역 */}
      <div className="space-y-3 flex flex-col">
        {/* 검색 */}
        <Link
          to="/search"
          className="flex items-center space-x-1 bg-black text-white px-3 py-1 rounded hover:bg-pink-600 transition text-xs"
        >
          <Search size={14} />
          <span>검색</span>
        </Link>

        {/* 마이페이지 */}
        {!accessToken ? (
          <Link
            to="/login"
            className="flex items-center space-x-1 bg-black text-white px-3 py-1 rounded hover:bg-pink-600 transition text-xs"
          >
            <UserRound size={14} />
            <span>마이페이지</span>
          </Link>
        ) : (
          <Link
            to="/my"
            className="flex items-center space-x-1 bg-black text-white px-3 py-1 rounded hover:bg-pink-600 transition text-xs"
          >
            <UserRound size={14} />
            <span>마이페이지</span>
          </Link>
        )}
        {/* 하단: 탈퇴하기 버튼 */}
        {accessToken && (
          <button className="mt-auto bg-black text-white py-2 px-3 rounded text-xs transition">
            탈퇴하기
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
