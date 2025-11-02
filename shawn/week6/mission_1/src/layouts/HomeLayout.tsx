import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";

export default function HomeLayout() {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const [userName, setUserName] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
        setUserName("");
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  // 사이드바 외부 클릭 시 닫기
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleFloatingButtonClick = () => {
    // LP 등록 페이지로 이동 (나중에 생성할 페이지)
    navigate("/lp/create");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* 헤더 */}
      <header className="bg-black border-b border-[#2a2a2a] sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
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

              <Link to="/" className="text-2xl font-bold text-pink-500">
                돌려돌려LP판
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {accessToken ? (
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

      {/* 사이드바 + 메인 콘텐츠 */}
      <div className="flex flex-1 relative">
        {/* 모바일 오버레이 */}
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
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <Sidebar />
        </div>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto w-full lg:w-auto">
          <Outlet />
        </main>
      </div>

      {/* 플로팅 버튼 */}
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
