import './App.css'
import HomePage from './pages/Homepage'
import MoviePage from './pages/MoviePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFound'
import MovieDetailPage from './pages/MovieDetailpage'

// 라우터 정의
// 1) 루트 경로 '/', <HomePage />
//    +) 잘못된 접근시 에러페이지 <NotFoundPage />
// 2) childeren 중첩 라우트 
//    - movies/:category(카테고리별 영화 목록 표시) => <MoviePage />
//    - movies/:id(영화의 상세정보 표시) => <MovieDetailPage />
const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    // 하위 경로를 정의하는 배열
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      // 특정 영화의 ID를 받음 
      // movies/:category/:id 로 합치면, 같은 경로 구조 안에서 목록이랑 상세 섞이게 됨
      //  -> 상세 페이지 라우팅 제대로 안됐던 문제...
      {
        path: 'movie/:movieId',   
        element: <MovieDetailPage />,
      }
    ]
  }
])

// RouterProvider에 만든 router전달
function App() {
  return <RouterProvider router={router} />
}

export default App
