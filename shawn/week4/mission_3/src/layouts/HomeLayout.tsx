import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function HomeLayout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup");
  
  // 로그인 상태 확인
  const isLoggedIn = localStorage.getItem("accessToken");

  return (
    <div className="min-h-screen flex flex-col">
      {/* 네비게이션 바 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-[#887bff]">
              MyApp
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/"
                    ? "bg-[#887bff] text-white"
                    : "text-gray-600 hover:text-[#887bff]"
                }`}
              >
                홈
              </Link>

              {!isAuthPage && (
                <>
                  {isLoggedIn ? (
                    <Link
                      to="/my"
                      className="px-4 py-2 text-gray-600 hover:text-[#887bff] transition-colors"
                    >
                      내 정보
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="px-4 py-2 text-gray-600 hover:text-[#887bff] transition-colors"
                      >
                        로그인
                      </Link>
                      <Link
                        to="/signup"
                        className="px-4 py-2 bg-[#887bff] text-white rounded-lg hover:bg-[#776eff] transition-colors"
                      >
                        회원가입
                      </Link>
                    </>
                  )}
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
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 MyApp. All rights reserved.</p>
            <p className="mt-2 text-sm">
              다단계 회원가입 시스템으로 더 나은 사용자 경험을 제공합니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
