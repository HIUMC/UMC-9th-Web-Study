import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import "./App.css";
import SignupPw from "./pages/passwordPage";
import NamePage from "./pages/namePage";
import MyPage from "./pages/myPage";

function App() {
  const router = createBrowserRouter([
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
        {
          path: "my",
          element: <MyPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
