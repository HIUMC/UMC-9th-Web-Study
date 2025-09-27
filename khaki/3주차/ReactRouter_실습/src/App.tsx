import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home';
import NotFound from './pages/not-found';
import Movies from './pages/movies';
import RootLayout from './layout/root-layout';
import SearchPage from './pages/SearchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    // 1) Navbar 아래에 표시할 자식 라우트
    // children에 들어있는 라우트들은 전부 부모 라우트의 <Outlet /> 안에 렌더링된다.
    children: [
      {
        // 2) index: true → 부모의 기본 경로('/')일 때 렌더
        index: true,
        element: <HomePage />,
      },
      {
        // 3) 부모가 '/'이므로, 'movies'만 써도 '/movies'로 매칭
        // /movies/뒤에 오는 값을 movieId라는 이름으로 받겠다는 뜻
        path: 'movies/:movieId',
        element: <Movies />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;