// src/pages/HomePage.tsx (가정)

import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar"; // Navbar 컴포넌트를 import 해야 합니다.

export default function Homepage() {
  const location = useLocation();

  // 현재 경로를 확인합니다. 예: /movies/12345
  // 정규 표현식 또는 단순 문자열 포함 여부로 확인 가능하지만,
  // 가장 정확한 방법은 라우트 구조를 활용하는 것입니다.

  // 간단한 확인: URL에 숫자만 있는 /movies/{숫자} 패턴이 상세 페이지라고 가정
  const isDetailPage = /^\/movies\/\d+$/.test(location.pathname);

  // 또는 더 단순하게:
  // const isDetailPage = location.pathname.split('/').length === 3 && !isNaN(Number(location.pathname.split('/').pop()));

  return (
    <div>
      {/* 상세 페이지가 아닐 때만 Navbar를 렌더링합니다. */}
      {!isDetailPage && <Navbar />}

      {/* 하위 라우트 컴포넌트 (MoviePage 또는 MovieDetailPage)가 렌더링되는 위치 */}
      <Outlet />
    </div>
  );
}
