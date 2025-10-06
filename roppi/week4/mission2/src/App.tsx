
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import RootLayout from './layout/root-layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const router  = createBrowserRouter(  [
  {
    path : "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
    ]
  },
  
]);

function App() {
  return (<RouterProvider router={router}/>
  )
}

export default App
