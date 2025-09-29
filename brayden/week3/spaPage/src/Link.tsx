import type { MouseEvent } from "react";
import type { LinkProps } from "./types";
import { getCurrentPath, navigateTo } from "./utils";

/**
 * 페이지를 새로고침하지 않고 SPA 내에서 라우팅을 수행하는 Link 컴포넌트입니다.
 */
export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // 기본 a 태그의 동작(페이지 새로고침)을 막습니다.
    e.preventDefault();

    // 현재 경로와 이동할 경로가 같다면 아무 작업도 하지 않습니다.
    if (getCurrentPath() === to) return;

    // navigateTo 유틸 함수를 호출하여 URL을 변경하고 상태 업데이트를 트리거합니다.
    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};
