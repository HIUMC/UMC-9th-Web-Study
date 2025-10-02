import './App.css'

// 1. React Router에서 필요한 함수/컴포넌트를 import
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import HomePage from './pages/home';
import Movies from './pages/movies';
import NotFound from './pages/not-found';
import RootLayout from './layout/root-layout';
import HomePage from './pages/home';

// 2. 경로(path)와 보여줄 화면(element)를 정의
const router = createBrowserRouter([
  {
    path: '/',
    //element: <HomePage />,
    element: <RootLayout />,
    errorElement: <NotFound />,
    // 1) Navbar 아래에 표시할 자식 라우트
    children: [
      {
        // 2) index: true → 부모의 기본 경로('/')일 때 렌더
        index: true,
        element: <HomePage />
      },
      {
        // 3) 부모가 '/'이므로, 'movies'만 써도 '/movies'로 매칭
        path: '/movies/:movieId?',
        element: <Movies />
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;