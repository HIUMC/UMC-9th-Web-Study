import type { FC } from "react";
import type { RouteProps } from "./types";

/**
 * 경로와 컴포넌트를 매핑하는 설정 컴포넌트입니다.
 * 이 컴포넌트 자체는 UI를 렌더링하지 않으며, Routes 컴포넌트가 props를 읽어 사용합니다.
 * Routes 컴포넌트가 일치하는 Route를 복제(clone)하면, 그때 이 컴포넌트가 래핑된 페이지 컴포넌트를 렌더링합니다.
 */
export const Route: FC<RouteProps> = ({ component: Component }) => {
  return <Component />;
};
