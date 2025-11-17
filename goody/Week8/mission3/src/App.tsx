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
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage";
import CommentPage from "./pages/CommentPage";
import ThrottlePage from "./pages/ThrottlePage";

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
            { path : "v1/auth/google/callback", element : <GoogleLoginRedirectPage/>},
            { path : "/throttle", element : <ThrottlePage />}
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
            },
            {
                path:'lp/:lpid',
                element: <LpDetailPage />,
                children : [
                    {
                        path:"comments",
                        element : <CommentPage/>
                    },
                ]
            },
        ]
    }
]

// protectedRoutes: 인증이 필요한 라우트

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:3,
        },
    },
});
function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    
    );
    
}

export default App
