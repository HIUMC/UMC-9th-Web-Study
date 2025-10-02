import './App.css'
import HomePage from './pages/HomePage';
import MoviePage from "./pages/MoviePage"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';
// createBrowserRouter v6

const router = createBrowserRouter([
  {
    path:'/',
    element : <HomePage />,
    errorElement : <NotFoundPage />,
    children: [
      {
        path:'movies/:category',
        element: <MoviePage />,
      },
      {
        path:'movie/:movieID',
        element: <MovieDetailPage />,
      },
    ],
  },
]);

// 쿼리파라미터 사용
// movies?category=upcoming 
// movies?category=popular
// movies?category=now_playing
// movies?category=top_rated
// movies/category/{movie_id} 다이나믹 라우팅? 

function App() {
  return <RouterProvider router={router} />;
}

export default App
