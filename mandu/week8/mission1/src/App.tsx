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
import ProtectedLayout from "./layout/protected-layout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
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
      {
        path: "/v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
      {
        path: "/",
        element: <ProtectedLayout />,
        children: [
          {
            path: "my",
            element: <MyPage />,
          },
          {
            path: "lp/:lpid",
            element: <DetailPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </>
  );
}

export default App;
