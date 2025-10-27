
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import RootLayout from './layout/root-layout';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';


const publicRoutes:RouteObject[]= [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleLoginRedirectPage />
      }
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path:'/',
    element: <ProtectedLayout />,
    children:[{
      path:'my',
      element: <MyPage />
    }]
  }
]


const router  = createBrowserRouter(  [...publicRoutes, ...protectedRoutes]);

function App() {
  return (
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
  )
}

export default App
