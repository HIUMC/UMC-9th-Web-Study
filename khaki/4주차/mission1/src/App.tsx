import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage2 from "./pages/MovieDetailPage2";
import MoviePage2 from "./pages/MoviePage2";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>, 
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: 'movies/:category',
        element : <MoviePage2/>
      },
    ]
  },
  {
    path: 'movie/:movieId',
    element : <MovieDetailPage2/>
  }
])

const App = () => {
  return <RouterProvider router={router}/>;
}

export default App
