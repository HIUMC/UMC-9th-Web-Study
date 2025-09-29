import "./App.css";
import Homepage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

// BrowserRouter v5
// createBrowserRouter v6
// react-rounter-dom v7(next.js, remix)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
    ],
  },
]);

// moive/upcoming
// movie/popular
// movie/now_playing
// movie/top_rated
// movie?category=upcoming
// movie?category=popular
// movie/{movie_id}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
