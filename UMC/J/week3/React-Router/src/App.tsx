import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1) 만든 페이지 import
import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import Movies from "./pages/movies";
import RootLayout from './layout/root-layout';

// 경로(path)와 보여줄 화면(element)를 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <NotFound/>,
    // 1) NavBar 아래에 표시할 자식 라우트
    children: [
      {
        // 2) index: true -> 부모의 기본 경로('/')일 때 렌더
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies",
        element: <Movies/>,
      },
      {
        // 3) 부모가 "/"이므로, "movies"만 써도 "/movies"로 매칭
        // movies/뒤에 오는 값을 movieId라는 이름으로 받겠다는 뜻
        path: "movies/:movieId" ,
        element: <Movies/>,
      },
    ],
   },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;