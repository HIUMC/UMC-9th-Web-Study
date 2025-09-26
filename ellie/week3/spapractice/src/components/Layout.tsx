// 앱 전체의 공통 레이아웃 정의
// 각 경로별 실제 내용을 <Outlet />에 채워진다

// Link : SPA 방식으로 페이지 이동을 할 수 있는 컴포넌트
// Outlet : 부모 라우트 안에서 자식 라우트의 컴포넌트가 렌더링될 위치를 표시하는 자리표시자
import {Outlet,Link} from "react-router-dom";

// Link to="..." : React Routher가 해당 경로에 맞는 컴포넌트 렌더링
// <hr /> : 구분선 표시
export default function Layout() {
  return (
    <div>
      <h1>My App</h1>
      <nav>
        <ul>
          <li><Link to="/">🌸홈🌸</Link></li>
          <li><Link to="/events">🌸이벤트🌸</Link></li>
          <li><Link to="/newsletter">🌸뉴스레터🌸</Link></li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}