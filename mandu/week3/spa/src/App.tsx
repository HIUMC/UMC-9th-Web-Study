import { useEffect, useState } from 'react';
import './App.css';
import { Link, Route, Routes } from './router';

const MatthewPage = () => <h1>매튜 페이지</h1>;
const AeongPage = () => <h1>애옹 페이지</h1>;
const JoyPage = () => <h1>조이 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link to='/matthew'>MATTHEW</Link>
      <Link to='/aeong'>AEONG</Link>
      <Link to='/joy'>JOY</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>
  );
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    // navigateTo 함수가 발생시킨 이벤트를 감지합니다.
    window.addEventListener('navigate', onLocationChange);
    // 브라우저 뒤로가기/앞으로가기 버튼 이벤트를 감지합니다.
    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('navigate', onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);
  return (
    <>
      <Header />
      <Routes currentPath={currentPath}>
        <Route path='/matthew' component={MatthewPage} />
        <Route path='/aeong' component={AeongPage} />
        <Route path='/joy' component={JoyPage} />
        <Route path='/not-found' component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;