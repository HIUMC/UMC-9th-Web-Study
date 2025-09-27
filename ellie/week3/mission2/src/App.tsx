import './App.css'
import HomePage from './pages/Homepage'
import MoviePage from './pages/MoviePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFound'
import MovieDetailPage from './pages/MovieDtailpage'

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [{
      path:'movies/:category',
      element:<MoviePage />,
    },
    {
      path: 'movies/:category/:id',
      element: <MovieDetailPage />
    }
  ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
