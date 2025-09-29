import { Link } from "./components/Link";
import { Routes } from "./components/Routes";
import { Route } from "./components/Route";
import { useCurrentPath } from "./hooks/useCurrentPath";

const Header = () => {
  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <Link to="/matthew">MATTHEW</Link>
      <Link to="/aeong">AEONG</Link>
      <Link to="/joy">JOY</Link>
      <Link to="/not-found">NOT FOUND</Link>
    </nav>
  );
};

const MatthewPage = () => {
  const path = useCurrentPath(); // 경로 변경 감지
  return (
    <>
      <Header />
      <h1>매튜 페이지</h1>
      <div>현재 경로: {path}</div>
    </>
  );
};
const AeongPage = () => {
  const path = useCurrentPath();
  return (
    <>
      <Header />
      <h1>애옹 페이지</h1>
      <div>현재 경로: {path}</div>
    </>
  );
};
const JoyPage = () => {
  const path = useCurrentPath();
  return (
    <>
      <Header />
      <h1>조이 페이지</h1>
      <div>현재 경로: {path}</div>
    </>
  );
};
const NotFound = () => {
  const path = useCurrentPath();
  return (
    <>
      <Header />
      <h1>Not Found</h1>
      <div>현재 경로: {path}</div>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/matthew" component={MatthewPage} />
      <Route path="/aeong" component={AeongPage} />
      <Route path="/joy" component={JoyPage} />
      <Route path="/not-found" component={NotFound} />
    </Routes>
  );
}

export default App;
