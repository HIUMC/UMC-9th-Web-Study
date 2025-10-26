import {
  RouterProvider,
  createBrowserRouter,
  type RouteObject,
} from "react-router-dom";
import RootLayout from "./layout/root-layout";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import "./App.css";
import SignupPw from "./pages/passwordPage";
import NamePage from "./pages/namePage";
import MyPage from "./pages/myPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layout/protexted-layout";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/pw",
        element: <SignupPw />,
      },
      {
        path: "/name",
        element: <NamePage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

function App() {
  const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
