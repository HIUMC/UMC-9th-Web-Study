import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  // createBrowserRouter([...]) 안에는 Route 객체들의 배열을 넣어준다.
  {
    path: '/',
    element: <HomePage/>, // 보통 레이아웃, 공통 UI를 입힐 수 있다.
    errorElement: <NotFoundPage/>,
    children: [
      // children도 결국 라우터이다. 자식 Route 객체들의 배열이 들어감. Outlet에 렌더링됨
      {
        path: 'movies/:category',
        // 이렇게 뒤에 :category를 붙여주면 ReactRouter가 url에 있는 값을 자동으로 params 객체로 만들어준다, 그 객체는 나중에 useParams()로 꺼내 쓸 수 있다!!
        element : <MoviePage/>
      },
      {
        path: 'movies/:category/:movieId',
        // 여기를 그냥 movies/:movieId로 해놓으면 위에 movieId를 위에 category로 인식하여 제대로 못찾음
        element : <MovieDetailPage/>
      }
      
    ]
  }
])

const App = () => {
  return <RouterProvider router={router}/>;
}

export default App
