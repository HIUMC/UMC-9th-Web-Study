import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { HomeLayout } from './layouts/HomeLayout';
import { SignUpPage } from './pages/SignUpPage';
import { MyPage } from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedLayout } from './layouts/ProtectedLayout';
import { GoogleLoginRedirectPage } from './pages/GoogleLoginRedirectPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { LpDetailPage } from './pages/LpDetailPage';
import { SidebarProvider } from './context/SideBarContext';

const LayoutSelect = () => {
  const { accessToken } = useAuth();

  if (accessToken) {
    return <ProtectedLayout />;
  }
  return <HomeLayout />;
};

// publicRoustes: 인증 없이 접근 가능한 라우트
const publicRoustes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutSelect />,
    errorElement: <NotFoundPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: "login", element: <LoginPage/> },
      { path: "signup", element: <SignUpPage/> },
      { path: "/v1/auth/google/callback", element: <GoogleLoginRedirectPage/> }
    ]
  }
];


// protectedRoutes: 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage/>,
    children: [
      {
      path: "my",
      element: <MyPage/>,
    },
    {
      path: "lp/:lpid",
      element: <LpDetailPage/>
    }
  ],
  },
];

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    }
  }
});

const router = createBrowserRouter([...publicRoustes, ...protectedRoutes]);
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <RouterProvider router = {router}/>
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
