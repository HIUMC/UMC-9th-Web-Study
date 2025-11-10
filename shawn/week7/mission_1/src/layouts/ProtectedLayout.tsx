/**
 * ========================================
 * 보호된 라우트 레이아웃 (Protected Layout)
 * ========================================
 *
 * 인증이 필요한 페이지들을 보호하는 레이아웃 컴포넌트입니다.
 * 로그인하지 않은 사용자가 접근하면 자동으로 로그인 페이지로 리다이렉트합니다.
 *
 * 사용 방법:
 * React Router에서 이 레이아웃으로 감싸진 라우트는 로그인이 필요합니다.
 *
 * 예시:
 * ```tsx
 * <Route element={<ProtectedLayout />}>
 *   <Route path="/mypage" element={<MyPage />} />
 *   <Route path="/settings" element={<Settings />} />
 * </Route>
 * ```
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * 인증 보호 레이아웃 컴포넌트
 *
 * @returns 로그인 상태에 따라 하위 라우트 또는 로그인 페이지로 리다이렉트
 */
const ProtectedLayout = () => {
  // 인증 컨텍스트에서 accessToken 가져오기
  const { accessToken } = useAuth();

  // accessToken이 없으면 (로그인하지 않음) 로그인 페이지로 리다이렉트
  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  // accessToken이 있으면 (로그인됨) 하위 라우트 렌더링
  return <Outlet />;
};

export default ProtectedLayout;
