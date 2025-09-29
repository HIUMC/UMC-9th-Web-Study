import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1) 만든 페이지 import
// import HomePage from './pages/home';
import NotFound from './pages/not-found';
import Movies from './pages/movies';
import RootLayout from './layout/root-layout';
import HomePage from './pages/home';

// 2) 라우터에 연결
const router = createBrowserRouter([
  {
    path: '/',
    // element: <HomePage />,
    element: <RootLayout />,
    errorElement: <NotFound />,
    // 1) Navbar 아래에 표시할 자식 Route
    children: [
      {
        // 2) index : true => 부모의 기본 경로('/') 일때 렌더
        index : true,
        element : <HomePage/>
      },
      {
        // 3) 부모가 '/' 이므로, 'movies'만 써도 '/movies'로 매칭
        path: 'movies/:movieId', // /movies/ 뒤에 오는 값을 movieId라는 이름으로 받겠다는 뜻
        element : <Movies/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;