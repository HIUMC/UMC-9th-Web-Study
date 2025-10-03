import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage/>,
      },
    ],
  },
]);

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return <RouterProvider router={router} />;
}

export default App
