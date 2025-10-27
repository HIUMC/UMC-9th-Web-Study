import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import PasswordPage from "./pages/PasswordPage";
import NamePage from "./pages/NamePage";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { GoogleLoginRedirectpage } from "./pages/GoogleLoginRedirectpage";

const publicRoutes:RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children : [
      {
        index: true,
        element : <HomePage />,
      },
      {
        path: 'login',
        element : <LoginPage />,
      },
      {
        path: 'signup',
        element : <SignupPage />,
      },
      {
        path:'password',
        element:<PasswordPage />,
      },
      {
        path:'name',
        element:<NamePage />,
      },
      {
        path:"v1/auth/google/callback",
        element:<GoogleLoginRedirectpage />
      }
    ]
  }
]

const protectedRoutes:RouteObject[] = [
  {
    path:"/",
    errorElement: <NotFound />,
    element:<ProtectedLayout/>,
    children:[
      {
        path:"my",
        element:<MyPage/>,
      }
    ]
  }
]

const router = createBrowserRouter([...publicRoutes,...protectedRoutes])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
