import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom"
import"./App.css"
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import SignupPWPage from "./pages/PasswordPage";
import SignupNamePage from "./pages/NamePage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes:RouteObject[] = [
    {
        path:'/',
        element : <HomeLayout/>,
        errorElement : <NotFoundPage/>,
        children : [
            { index: true, element: <HomePage/> },
            { path: "login", element: <LoginPage/> },
            { path: "signup", element: <SignupPage/> },
            { path : "pw", element: <SignupPWPage />},
            { path : "name", element: <SignupNamePage />},
        ]
    }
];


const protectedRoutes:RouteObject[] = [
    {
        path:"/",
        element:<ProtectedLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path:"my",
                element:<MyPage />
            }
        ]
    }
]

// protectedRoutes: 인증이 필요한 라우트

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
function App() {

    return (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
    );
    
}

export default App
