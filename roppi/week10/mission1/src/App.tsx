import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom"
import RootLayout from "./layout/layout"
import NotFound from "./pages/NotFoundPage"
import Home from "./pages/HomePage"

function App() {

  const routes : RouteObject[] = [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ]
    }
  ]

  const router = createBrowserRouter(routes)

  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

export default App
