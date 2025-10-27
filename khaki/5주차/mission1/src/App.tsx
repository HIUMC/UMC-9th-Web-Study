import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";

// 1. 홈페이지
// 2. 로그인 페이지
// 3 회원가입 페이지

// publicRoutes: 인증이 필요없는(로그인 안해도 되는) 페이지들
const publicRoutes:RouteObject[] = [
  {
    path: "/",  
    element: <HomeLayout/>,   //여기에는 보통 공통된 레이아웃이 들어감
    errorElement: <NotFoundPage/>,
    children:[  // nav와 footer는 고정되고 가운데 부분만 경로에 따라 바뀜
      {
        index: true,
        element: <HomePage/> 
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'signup',
        element: <SignupPage/>
      },
    ]
  },
]
// privateRoutes: 인증이 필요한(로그인 해야만 되는) 페이지들
const privateRoutes:RouteObject[] = [
  {
    path:'/',
    element:<ProtectedLayout/>,
    errorElement:<NotFoundPage/>,
    children:[
      {
        path:'my',
        element:<MyPage/>
      }
    ] 
  }
  ]

const router = createBrowserRouter([...publicRoutes,...privateRoutes]);

function App() {

  // <AuthProvider>로 감싸서 어떤 컴포넌트에서든지 AuthContext에 접근 가능하게 함
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>  
  )
}

export default App
