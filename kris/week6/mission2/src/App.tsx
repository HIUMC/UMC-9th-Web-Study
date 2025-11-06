import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import './App.css'
import Homepage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomeLayout from './layouts/HomeLayout'
import SignupPage from './pages/SignupPage'
import { MyPage } from './pages/MyPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedLayout from './layouts/ProtectedLayout'
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LpDetailsPage } from './pages/LpDetailsPage'

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Homepage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'signup',
        element: <SignupPage/>
      },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleLoginRedirectPage/>
      },
    ]
  }
]

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout/>,
    children: [
      {
        path: 'my',
        element: <MyPage/>
      },
      {
        path: 'lp/:lpid',
        element: <LpDetailsPage/>
      }
  ]
  }
]

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    }
  }
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false}/>}
    </QueryClientProvider>
  )
}

export default App
