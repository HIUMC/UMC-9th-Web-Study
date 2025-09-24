import { Children, isValidElement, useMemo, type ReactElement, type ReactNode } from "react";
import { Route, type RouteProps } from "./Route";
import { useCurrentPath } from '../hooks/useCurrentPath';


interface RoutesProps{
  children : ReactNode;
}

function isRouteElement(node: ReactNode): node is ReactElement<RouteProps> {
  return isValidElement(node) && node.type === Route;
}

export const Routes = ({ children }:RoutesProps) => {
  const currentPath = useCurrentPath();
  // 커스텀 훅 호출, 현재 경로를 state로 가져옴
  // 경로가 바뀌면 이 값이 바뀌고 컴포넌트 리렌더

  const activeRoute = useMemo(() => {
    // activeRoute에는 현재경로와 일치하는 Route 컴포넌트가 들어감 
    const routes = Children.toArray(children).filter(isRouteElement);
    // Children.toArray(children) → children을 안전하게 배열로 변환 (단일 요소/Fragment/문자열 섞여 있어도 통일)
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  // useMemo : 
  // 첫 번째 인자: 값을 계산해 반환하는 함수
  // 두 번째 인자: 의존성 배열. 여기 있는 값이 바뀌면 다시 계산, 안 바뀌면 이전 값을 재사용
  // 반환값 : 첫 번째 인자로 넘긴 함수가 return한 값을 그대로 돌려줘요.다만 그 값을 deps가 바뀔 때만 다시 계산해서 업데이트하고, 바뀌지 않으면 이전 값을 재사용(캐싱) 합니다.

  if (!activeRoute) return null;
  return activeRoute;
};