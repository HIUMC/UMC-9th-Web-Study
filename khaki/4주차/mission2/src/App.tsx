import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";

// 1. 홈페이지
// 2. 로그인 페이지
// 3 회원가입 페이지

const router = createBrowserRouter([
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
      }
    ]
  },
]);

function App() {

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
