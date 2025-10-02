import "./App.css";

// 1. React Router에서 필요한 함수/컴포넌트를 import
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// createBrowserRouter : 우리가 원하는 경로(path)와 해당 경로일 때 보여줄
// 컴포넌트(element)를 정의함
// 예시 : path : '/' -> 홈화면, path:'/movies' -> 영화화면

// RouterProvider : 우리가 만든 router를 실제 앱에 적용해주는 역할
// RouterProvider 안에서만 라우팅이 동작함

// 경로확인
// path : '/' -> localhost:5173/ -> 홈화면
// path : '/movies' -> localhost:5173/movies -> 영화화면

// 방법 2.
// 와일드 카드 경로(*)로 새로운 라우트를 만들어 보여주기
const NotFound = () => (
  <main style={{ padding: 24 }}>
    <h1>페이지를 찾을 수 없어요(404)</h1>
    <p>
      주소를 다시 확인하거나 홈으로 이동해주세요<div className=""></div>
    </p>
    <a href="/">홈으로</a>
  </main>
);

// 2. 경로(path)와 보여줄 화면(element)를 정의
const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>홈 페이지입니다. </h1>,
    // 방법 1.
    // 루트 라우터에 errorElement 지정 -> 정의되지 않은 경로로 진입 시
    // 아래 컴포넌트를 보여줄 수 있음.참고로 루트에 넣어두면 대부분의 없는 경로를 커버가능
    errorElement: <h1>너는 없는 경로에 들어왔다 야호!</h1>,
  },
  {
    path: "/movies",
    element: <h1>영화 페이지입니다. </h1>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

// 두 방식은 함께 사용 가능
// 일반적인 404는 '*' 라우트에서 처리하고
// 라우트 로딩/액션 중 발생한 에러는 errorElement로 처리하는 식으로 분배가능;

// 3. RouterProvider로 router 전달
function App() {
  return <RouterProvider router={router} />;
}

export default App;
