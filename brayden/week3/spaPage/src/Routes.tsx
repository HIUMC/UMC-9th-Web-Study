import { Children, cloneElement, useMemo } from "react";
import type { FC } from "react";
import { useCurrentPath } from "./hooks";
import { isRouteElement, type RoutesProps } from "./types";

/**
 * 현재 경로와 일치하는 Route를 찾아 렌더링하는 컴포넌트입니다.
 */
export const Routes: FC<RoutesProps> = ({ children }) => {
  // useCurrentPath 훅을 통해 현재 경로를 가져옵니다. 경로가 변경되면 이 컴포넌트는 리렌더링됩니다.
  const currentPath = useCurrentPath();

  // 현재 경로가 변경될 때만 일치하는 라우트를 다시 계산하도록 useMemo를 사용합니다.
  const activeRoute = useMemo(() => {
    // 1. 자식 요소들을 배열로 변환하고, 유효한 Route 엘리먼트만 필터링합니다.
    const routes = Children.toArray(children).filter(isRouteElement);

    // 2. 필터링된 라우트 중에서 현재 경로와 path prop이 일치하는 라우트를 찾습니다.
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  // 일치하는 라우트가 없으면 null을 반환하여 아무것도 렌더링하지 않습니다.
  if (!activeRoute) return null;

  // 찾은 라우트 엘리먼트를 복제하여 렌더링합니다.
  return cloneElement(activeRoute);
};
