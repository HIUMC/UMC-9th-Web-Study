import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>, 
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: 'movies/:category',
        element : <MoviePage/>
      },
    ]
  },
  {
    path: 'movie/:movieId',
    element : <MovieDetailPage/>
  }
])

const App = () => {
  return <RouterProvider router={router}/>;
}

export default App
