/**
 * ========================================
 * 홈 레이아웃 컴포넌트 (HomeLayout)
 * ========================================
 *
 * 애플리케이션의 메인 레이아웃을 담당하는 컴포넌트입니다.
 * 헤더, 사이드바, 플로팅 버튼, 그리고 메인 콘텐츠 영역을 포함합니다.
 *
 * 주요 기능:
 * 1. 헤더: 로고, 로그인/로그아웃 버튼, 사용자 이름 표시
 * 2. 사이드바: 네비게이션 메뉴 (모바일에서는 토글 가능)
 * 3. 플로팅 버튼: LP 등록 페이지로 이동
 * 4. 반응형: 모바일과 데스크탑에서 다른 UI 제공
 */

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";

/**
 * 홈 레이아웃 컴포넌트
 * React Router의 Outlet을 사용하여 하위 라우트의 컴포넌트를 렌더링합니다.
 */
export default function HomeLayout() {
  // 라우터 네비게이션 함수
  const navigate = useNavigate();

  // 인증 컨텍스트에서 accessToken과 logout 함수 가져오기
  const { accessToken, logout } = useAuth();

  // 사용자 이름 상태 (API로부터 가져옴)
  const [userName, setUserName] = useState<string>("");

  // 사이드바 열림/닫힘 상태 (모바일에서 사용)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 사이드바 DOM 참조 (외부 클릭 감지에 사용)
  const sidebarRef = useRef<HTMLDivElement>(null);

  /**
   * 사용자 정보 조회 Effect
   * accessToken이 있으면 서버에서 사용자 정보를 가져와 이름을 표시
   * accessToken이 변경될 때마다 실행 (로그인/로그아웃 시)
   */
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
        try {
          const response = await getMyInfo();
          setUserName(response.data.name);
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
        }
      } else {
        // 로그아웃 시 사용자 이름 초기화
        setUserName("");
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  /**
   * 사이드바 외부 클릭 감지 Effect
   * 사이드바가 열려있을 때 외부를 클릭하면 자동으로 닫힘 (모바일에서)
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    // 마우스 다운 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  /**
   * 플로팅 버튼 클릭 핸들러
   * LP 등록 페이지로 이동 (아직 구현되지 않은 페이지)
   */
  const handleFloatingButtonClick = () => {
    navigate("/lp/create");
  };

  /**
   * 로그아웃 버튼 클릭 핸들러
   * 로그아웃 후 로그인 페이지로 이동
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // JSX 렌더링
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* ==================== 헤더 영역 ==================== */}
      <header className="bg-black border-b border-[#2a2a2a] sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            {/* 좌측: 햄버거 버튼 + 로고 */}
            <div className="flex items-center gap-4">
              {/* 햄버거 버튼 (모바일에서만 표시) */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-300 hover:text-white transition-colors"
                aria-label="메뉴 열기"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M7.95 11.95h32m-32 12h32m-32 12h32"
                  />
                </svg>
              </button>

              {/* 로고: 클릭 시 홈으로 이동 */}
              <Link to="/" className="text-2xl font-bold text-pink-500">
                돌려돌려LP판
              </Link>
            </div>

            {/* 우측: 로그인 상태에 따른 버튼들 */}
            <div className="flex items-center gap-4">
              {accessToken ? (
                // 로그인된 경우: 사용자 이름 + 로그아웃 버튼
                <>
                  <span className="text-sm text-gray-300 hidden sm:block">
                    {userName || "연진킴"}님 반갑습니다.
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                // 로그아웃된 경우: 로그인 + 회원가입 버튼
                <>
                  <Link
                    to="/login"
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-md transition-colors"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ==================== 사이드바 + 메인 콘텐츠 영역 ==================== */}
      <div className="flex flex-1 relative">
        {/* 모바일 오버레이 (사이드바가 열렸을 때 뒷배경 어둡게) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 사이드바 */}
        <div
          ref={sidebarRef}
          className={`
            fixed lg:sticky top-0 left-0 h-screen z-40
            transform transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0" // 모바일에서 열린 상태
                : "-translate-x-full lg:translate-x-0" // 모바일에서 닫힌 상태, 데스크탑에서는 항상 표시
            }
          `}
        >
          <Sidebar />
        </div>

        {/* 메인 콘텐츠 영역: React Router의 하위 라우트가 여기에 렌더링됨 */}
        <main className="flex-1 overflow-y-auto w-full lg:w-auto">
          <Outlet />
        </main>
      </div>

      {/* ==================== 플로팅 버튼 (LP 등록) ==================== */}
      <button
        onClick={handleFloatingButtonClick}
        className="fixed bottom-8 right-8 w-14 h-14 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg transition-all hover:scale-110 z-40"
        aria-label="LP 등록하기"
      >
        +
      </button>
    </div>
  );
}
