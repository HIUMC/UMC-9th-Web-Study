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
//    - movies/:category/:id(영화의 상세정보 표시) => <MovieDetailPage />
const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
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
