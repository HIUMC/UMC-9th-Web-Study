import './App.css';
import { Routes } from './router/Routes';
import { Route } from './router/Route';
import { Link } from './router/Link';
// 나중에 React Router 라이브러리를 쓰면 기본제공 되나 지금은 직접 만든 컴포넌트들임

/*
<동작 흐름>
1. 초기 렌더 : App은 항상 <Header />(메뉴바)를 렌더하고, <Routes> 안의 여러 <Route> 규칙 중 현재 URL과 일치하는 것 하나를 찾아 렌더함.

2. 메뉴(헤더) 렌더 : <Header /> 안에는 네가 만든 **<Link>**들이 있음

3. 현재 URL과 매칭 : <Routes>는 내부에서 현재 경로(window.location.pathname)를 보고 -> 자식으로 받은 <Route path=... component=.../> 중에서 처음으로 정확히 일치하는 path를 찾음 -> 찾으면 그 Route의 component를 렌더

4. 링크 클릭(새로고침 없이 화면 전환) : 
 -  헤더에서 <Link to='/aeong'>AEONG</Link>를 클릭 
 - Link가 **preventDefault()**로 브라우저의 전체 새로고침을 막고 
 - history.pushState**로 주소만 바꿈(/aeong) 
 - 커스텀 이벤트가 발생
 - <Routes>가 경로가 바뀐 걸 감지하고 리렌더
 - 이번엔 /aeong과 일치하는 <Route>가 선택되어 **<AeongPage />**가 렌더.
*/


// 페이지 컴포넌트들
const MatthewPage = () => <h1>매튜 페이지</h1>;
const AeongPage = () => <h1>애옹 페이지</h1>;
const JoyPage = () => <h1>조이 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

// 상단 네비게이션 바
// - to : 이동할 경로를 문자열로 받는 props
// - children : 컴포넌트를 태그처럼 열고 닫았을 때, 그 사이에 들어가는 내용을 자동으로 props로 전달해주는 특별 키워드
// 따라서 Link 컴포넌트에서 props.children이 MATTHEW, AEONG, JOY... 인거임
const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '10px', position:'fixed',
      top:0}}>
      <Link to='/matthew'>MATTHEW</Link>
      <Link to='/aeong'>AEONG</Link>
      <Link to='/joy'>JOY</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>
  );
};

// App 컴포넌트
// - Routes : 현재 경로에 맞는 Route를 하나 골라주는 역할
// - Route : 경로와 어떤 컴포넌트를 연결하는 규칙
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/matthew' Component={MatthewPage} />
        <Route path='/aeong' Component={AeongPage} />
        <Route path='/joy' Component={JoyPage} />
        <Route path='/not-found' Component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;