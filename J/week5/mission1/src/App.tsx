import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { MyPage } from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedLayout } from './layouts/ProtectedLayout';
import { HomeLayout } from './layouts/HomeLayout';

// publicRoustes: 인증 없이 접근 가능한 라우트
const publicRoustes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: "login", element: <LoginPage/> },
      { path: "signup", element: <SignUpPage/> },
    ]
  }
]

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
  ],
  },
];

const router = createBrowserRouter([...publicRoustes, ...protectedRoutes]);
function App() {

  return (
    <AuthProvider>
      <RouterProvider router = {router}/>
    </AuthProvider>
  )
}

export default App
