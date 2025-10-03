import './App.css'
import Homepage from './pages/Homepage'
import MoviePage from './pages/MoviePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound'
import MovieDetailPage from './pages/MovieDetailPage'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Homepage />,
    errorElement: <NotFound />,
    children: [{
      path:'movies/:category',
      element:<MoviePage />,
    },
    {
      path: 'movies/:movieId',
      element: <MovieDetailPage />
    },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App