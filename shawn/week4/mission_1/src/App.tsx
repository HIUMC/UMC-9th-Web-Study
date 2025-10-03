import MoviePage from "./pages/MoviePage";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

//BrowserRouter v5
//createBrowserRouter v6
//react-router-dom v7(next.js, remix)

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
    ],
  },
  {
    path: "/movie/:movieId",
    element: <MovieDetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
