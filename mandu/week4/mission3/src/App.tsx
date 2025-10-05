import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import "./App.css";
import SignupPw from "./pages/passwordPage";

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
