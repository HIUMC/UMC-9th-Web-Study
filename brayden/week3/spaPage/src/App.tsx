import "./App.css";
// router/index.ts 덕분에 한 줄로 import 할 수 있습니다.
import { Link, Route, Routes } from "./router";

// 페이지 컴포넌트들
const MatthewPage = () => <h1>매튜 페이지</h1>;
const AeongPage = () => <h1>애옹 페이지</h1>;
const JoyPage = () => <h1>조이 페이지</h1>;
// 사용자가 '/not-found' 경로로 직접 이동해야만 보이는 404 페이지입니다.
const NotFoundPage = () => <h1>404 NOT FOUND</h1>;

// 네비게이션 헤더 컴포넌트
const Header = () => {
  return (
    <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <Link to="/matthew">MATTHEW</Link>
      <Link to="/aeong">AEONG</Link>
      <Link to="/joy">JOY</Link>
      <Link to="/not-found">NOT FOUND LINK</Link>
    </nav>
  );
};

// 메인 앱 컴포넌트
function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/matthew" component={MatthewPage} />
          <Route path="/aeong" component={AeongPage} />
          <Route path="/joy" component={JoyPage} />
          <Route path="/not-found" component={NotFoundPage} />
        </Routes>
      </main>
    </>
  );
}

export default App;
