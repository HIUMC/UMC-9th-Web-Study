import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. 만든 페이지 import
import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import MoviesPage from "./pages/movies";
import RootLayout from "./layout/root-layout";

// 2. 라우터에 연결
const router = createBrowserRouter([
  {
    path: "/",
    // element: <HomePage />,
    element: <RootLayout />,
    // 라우터와 navbar를 연결. 이때 원하는 동작을 만들려면
    // 자식 라우트(children)로 페이지들을 넣어서 Outlet에
    // 렌더링되도록 해야함.
    errorElement: <NotFound />,
    // 1. Navbar 아래에 표시할 자식 라우트
    children: [
      {
        // 2. index : true -> 부모의 기본 경로('/')일 때 렌러
        index: true,
        element: <HomePage />,
      },
      {
        // 3. 부모가 '/'이므로, 'movies'만 써도 '/movies'로 매핑됨
        path: "movies/:movieId",
        element: <MoviesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// 동적 라우팅
// URL의 일부를 변수처럼 받아 같은 페이지 구조로 서로 다른 내용을 보여주는 방식
// UI는 같지만 내용은 다른 화면일 때 사용
// 예시 : coupang.com/vp/products/123
// 예시 : coupang.com/vp/products/456
