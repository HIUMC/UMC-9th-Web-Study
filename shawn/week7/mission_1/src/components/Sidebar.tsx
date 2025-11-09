/**
 * ========================================
 * 사이드바 컴포넌트 (Sidebar)
 * ========================================
 *
 * 왼쪽 사이드 네비게이션 바를 렌더링하는 컴포넌트입니다.
 * 주요 페이지로 이동할 수 있는 메뉴를 제공합니다.
 *
 * 주요 기능:
 * 1. 검색 페이지로 이동
 * 2. 마이페이지로 이동
 * 3. 회원 탈퇴 버튼
 * 4. 현재 경로를 시각적으로 강조 표시
 */

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  onDeleteClick: () => void;
}

/**
 * 사이드바 컴포넌트
 */
const Sidebar = ({ onDeleteClick }: SidebarProps) => {
  // 현재 위치(경로) 정보 가져오기
  const location = useLocation();
  const { accessToken } = useAuth();

  // 메뉴 아이템 목록 정의
  const menuItems = [
    {
      path: "/search",
      label: "찾기",
      icon: "🔍",
    },
    {
      path: "/my",
      label: "마이페이지",
      icon: "👤",
    },
  ];

  return (
    <aside className="w-48 bg-black border-r border-[#2a2a2a] h-[calc(100vh-64px)] sticky top-16 flex flex-col">
      <nav className="pt-8 flex-shrink-0">
        <ul className="space-y-2">
          {/* 메뉴 아이템을 순회하며 렌더링 */}
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-white hover:bg-[#1a1a1a] transition-colors ${
                  // 현재 경로와 일치하면 활성화 스타일 적용
                  location.pathname === item.path
                    ? "text-white bg-[#1a1a1a] border-l-4 border-pink-500"
                    : ""
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 하단 탈퇴 버튼 (로그인된 경우에만 표시) */}
      {accessToken && (
        <div className="mt-auto p-4 border-t border-[#2a2a2a] flex-shrink-0">
          <button
            onClick={onDeleteClick}
            className="w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-[#1a1a1a] rounded-md transition-colors"
          >
            탈퇴하기
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
