import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Search } from "./pages/Search";
import { Lp } from "./pages/Lp";

// 1. 홈페이지
// 2. 로그인 페이지
// 3 회원가입 페이지

// publicRoutes: 인증이 필요없는(로그인 안해도 되는) 페이지들
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />, //여기에는 보통 공통된 레이아웃이 들어감
    errorElement: <NotFoundPage />,
    children: [
      // nav와 footer는 고정되고 가운데 부분만 경로에 따라 바뀜
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "lp/:lpId",
        element: <Lp />,
      },
      // 2. 백에서 권한처리를 완료하고 토큰과 함께 리다이렉트 시켜주는 페이지
      {
        path: "v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
];

// privateRoutes: 인증이 필요한(로그인 해야만 되는) 페이지들
const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // 전역적으로 쿼리 재시도 횟수
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
