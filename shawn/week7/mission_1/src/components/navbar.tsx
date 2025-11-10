/**
 * ========================================
 * 네비게이션 바 컴포넌트 (Navbar)
 * ========================================
 *
 * 상단 네비게이션 바를 렌더링하는 컴포넌트입니다.
 * 로그인 상태에 따라 다른 메뉴를 표시합니다.
 *
 * 주요 기능:
 * 1. 홈 링크
 * 2. 로그인 상태: 내정보, 로그아웃
 * 3. 비로그인 상태: 로그인, 회원가입
 *
 * 참고: 현재 이 컴포넌트는 HomeLayout에서 대체되어 사용되지 않을 수 있습니다.
 */

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * 네비게이션 바 컴포넌트
 */
const Navbar = () => {
  // 인증 컨텍스트에서 accessToken과 logout 함수 가져오기
  const { accessToken, logout } = useAuth();

  return (
    <nav className="flex flex-row bg-gray-900 justify-between gap-4 p-4 text-white">
      {/* 홈 링크 */}
      <NavLink to="/" className="place-content-center">
        홈
      </NavLink>

      {/* 우측 메뉴: 로그인 상태에 따라 다른 메뉴 표시 */}
      <div className="flex flex-row gap-4 p-4 place-content-center">
        {accessToken ? (
          // 로그인된 경우
          <>
            <NavLink to="/mypage">내정보</NavLink>
            <button onClick={() => logout()} className="hover:underline">
              로그아웃
            </button>
          </>
        ) : (
          // 로그아웃된 경우
          <>
            <NavLink to="/login">로그인</NavLink>
            <NavLink to="/signup">회원가입</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
