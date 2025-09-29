import { type MouseEvent } from 'react';

interface LinkProps {
  to : string;
  children: React.ReactNode;
}

// 현재 브라우저 주소창의 경로를 문자열로 반환하는 함수
function getCurrentPath() : string {
  return window.location.pathname;
}

// 새로고침 없이 URL만 바꾸고, 라우터가 다시 렌더되도록 이벤트를 발생시키는 함수
function navigateTo(to : string) {
  if (getCurrentPath() === to) return;
  // 같은 경로면 무시
  window.history.pushState(null,"",to);
  // pushState로 주소만 바꿈, 새로고침 x, (이때는 이벤트가 없다)
  window.dispatchEvent(new Event('popstate'));
  // 지금 히스토리가 바뀌었다고 알림 쏘기
  // 왜냐하면 <Routes>에서 window.addEventListener('popstate', ...)로 경로 변화를 감지하니까,pushState로 바꿨을 때도 리렌더를 트리거시키려면 직접 이벤트를 쏴야 함
}

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();   
    // <a> 태그의 기본동작(페이지 전체 새로고침)을 막음
    if (getCurrentPath() === to) return;
    // 이미 같은 경로라면 아무것도 안함
    navigateTo(to);
    // 
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

