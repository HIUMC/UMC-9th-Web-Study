/**
 * ========================================
 * 애플리케이션 메인 컴포넌트 (App)
 * ========================================
 *
 * 애플리케이션의 진입점이자 최상위 컴포넌트입니다.
 * 라우팅, 전역 상태 관리, 데이터 캐싱 등의 설정을 담당합니다.
 *
 * 주요 구성 요소:
 * 1. React Router: 페이지 라우팅 관리
 * 2. React Query: 서버 상태 관리 및 캐싱
 * 3. AuthProvider: 인증 상태 관리
 * 4. Protected/Public Routes: 인증 필요 여부에 따른 라우트 분리
 *
 * 라우트 구조:
 * - Public Routes: 로그인 없이 접근 가능 (홈, LP 상세, 로그인, 회원가입)
 * - Protected Routes: 로그인 필요 (마이페이지)
 *
 * Provider 계층 구조:
 * QueryClientProvider > AuthProvider > RouterProvider
 */

import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import LpDetailPage from "./pages/LpDetailPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";
import { GoogleLoginRedirectpage } from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Public Routes: 인증 없이 접근 가능한 라우트
 * HomeLayout으로 감싸져 있어 헤더, 사이드바, 플로팅 버튼 등이 포함됨
 */
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />, // 공통 레이아웃 (헤더, 사이드바 등)
    errorElement: <NotFoundPage />, // 에러 발생 시 표시할 페이지
    children: [
      { index: true, element: <HomePage /> }, // 홈페이지 (LP 목록)
      { path: "lp/:lpId", element: <LpDetailPage /> }, // LP 상세 페이지
      { path: "login", element: <LoginPage /> }, // 로그인 페이지
      { path: "signup", element: <SignupPage /> }, // 회원가입 페이지
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectpage /> }, // 구글 로그인 콜백
    ],
  },
];

/**
 * Protected Routes: 인증이 필요한 라우트
 * ProtectedLayout으로 감싸져 있어 로그인하지 않은 사용자는 자동으로 로그인 페이지로 리다이렉트
 */
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />, // 인증 확인 레이아웃
    errorElement: <NotFoundPage />,
    children: [
      { path: "my", element: <MyPage /> }, // 마이페이지 (로그인 필요)
    ],
  },
];

/**
 * React Router 인스턴스 생성
 * Protected Routes를 먼저 배치하여 인증 체크가 우선되도록 함
 */
const router = createBrowserRouter([...protectedRoutes, ...publicRoutes]);

/**
 * React Query 클라이언트 설정
 * 서버 데이터 캐싱 및 동기화를 관리
 *
 * 설정:
 * - retry: 3 - API 요청 실패 시 3번까지 자동 재시도
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 실패 시 재시도 횟수
    },
  },
});

/**
 * App 컴포넌트
 * 애플리케이션의 최상위 컴포넌트로, 모든 Provider와 라우터를 설정
 *
 * Provider 계층:
 * 1. QueryClientProvider: React Query 기능 제공
 * 2. AuthProvider: 인증 상태 관리
 * 3. RouterProvider: 라우팅 기능 제공
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {/* 개발 환경에서만 React Query DevTools 표시 */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
