
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LpDetailPage from './pages/LpDetailPage';
import ThrottlePage from './pages/ThrottlePage';


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
      },
      {
        path: 'throttle',
        element: <ThrottlePage />
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
    },
      {
        path: 'lps/:lpid',
        element: <LpDetailPage />
      }
  ]
  }
]


const router  = createBrowserRouter(  [...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient();

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    {/* {import.meta.env.DEV && 
    <ReactQueryDevtools initialIsOpen={false} /> // 배포환경에서는 제거
    } */}
  </QueryClientProvider>
  )
}

export default App
