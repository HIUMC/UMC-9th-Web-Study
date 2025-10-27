import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export default function HomeLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 실시간 감지
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    // 초기 상태 확인
    checkLoginStatus();

    // storage 이벤트 리스너 (다른 탭에서 로그인/로그아웃 시)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    // 커스텀 이벤트 리스너 (같은 탭에서 로그인/로그아웃 시)
    const handleLoginChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("loginChange", handleLoginChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginChange", handleLoginChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* 네비게이션 바 */}
      <nav className="bg-black border-b border-[#2a2a2a]">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-pink-500">
              돌려돌려LP판
            </Link>

            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <Link
                  to="/my"
                  className="px-4 py-2 rounded-md text-gray-300 hover:text-white transition-colors"
                >
                  내 정보
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    로그인
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 푸터 */}
      <footer className="border-t border-[#2a2a2a] bg-black">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 돌려돌려LP판</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
