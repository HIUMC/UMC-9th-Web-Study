// createBrowserRouter : 라우터 객체를 생성하는 함수
// RouterProvider : 만든 라우터를 앱에 공급해주는 컴포넌트
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import EventLayout from "./components/EventLayout";
import NewsletterPage from "./components/NewsletterPage";

// path : 루트 경로에서 시작하는 라우트를 정의
// element :  최상위 루트를 항상 Layout />
// 루트 경로 : 가장 기본 주소
// children : 자식 라우트 , <Layout /> 안의  <Outlet /> 위치에서 렌더링
const router=createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {index: true,element:<HomePage />},
      {path:"events",element:<EventLayout/>},
      {path:"newsletter",element:<NewsletterPage/>}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;