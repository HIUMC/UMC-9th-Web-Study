import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Curriculum from "./components/Curriculum";
import Facility from "./components/Facility";
import Map from "./components/Map";
import Notice from "./components/Notice";
import NotFound from "./components/NotFound";

function App() {
  // 현재 URL 경로를 상태로 관리 (예: '/', '/curriculum' 등)
  const [pathname, setPathname] = useState(window.location.pathname);

  // 브라우저에서 '뒤로가기/앞으로가기' 했을 때 실행되는 이벤트
  // => URL은 바뀌었는데 React 화면이 안 바뀌면 안 되니까 상태도 갱신
  window.onpopstate = () => {
    setPathname(window.location.pathname);
  };

  // 현재 경로(pathname)에 따라 어떤 페이지를 보여줄지 결정
  const renderPage = () => {
    switch (pathname) {
      case "/":
        return <Home />;
      case "/curriculum":
        return <Curriculum />;
      case "/facility":
        return <Facility />;
      case "/map":
        return <Map />;
      case "/notice":
        return <Notice />;
      default:
        return <NotFound />;
    }
  };

  return (
    // 모든 페이지에서 공통으로 보이는 Navbar
    <div className="container">
      <Navbar currentPath={pathname}
        // onNavigate : Navbar 버튼 클릭 시 실행, URL을 바꾸고, 상태도 바꿔 페이지가 바뀌도록 함
        onNavigate={(p) => {
          history.pushState({}, "", p); // URL 변경
          setPathname(p); // 상태 변경 -> renderPage()로 다시 실행됨
        }}
      />
      {renderPage()}
    </div> // 현재 경로에 맞는 컴포넌트를 화면에 렌더링하기
  );
}

export default App;