import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import Movies from "./pages/movies";
import MovieDetail from "./pages/movie-detail";
import RootLayout from "./layout/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/popular",
        element: <Movies category="popular" />,
      },
      {
        path: "movies/upcoming",
        element: <Movies category="upcoming" />,
      },
      {
        path: "movies/top-rated",
        element: <Movies category="top_rated" />,
      },
      {
        path: "movies/now-playing",
        element: <Movies category="now_playing" />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetail />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
