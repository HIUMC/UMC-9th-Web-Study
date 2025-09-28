import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home';
import NotFound from './pages/not-found';
import Movies from './pages/movies';
import RootLayout from './layout/root-layout';
import NowPlaying from './pages/nowPlaying';
import TopRated from './pages/topRated';
import UpComing from './pages/upComing';
import MovieDetail from './pages/movieDetail';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <NotFound />,
      },
      {
        path: 'movies',
        element: <Movies />,
        errorElement: <NotFound />,
      },
      {
        path: 'now_playing',
        element: <NowPlaying />,
        errorElement: <NotFound />,
      },
      {
        path: 'top_rated',
        element: <TopRated />,
        errorElement: <NotFound />,
      },
      {
        path: 'up_coming',
        element: <UpComing />,
        errorElement: <NotFound />,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetail />,
        errorElement: <NotFound />,
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;