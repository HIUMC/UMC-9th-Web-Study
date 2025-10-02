import { type FC, useMemo, Children, cloneElement, isValidElement } from "react";
import type { RouteProps } from "./Route"; // Route의 props 타입 가져오기
import { useCurrentPath } from "../hooks/useCurrentPath";

export interface RoutesProps {
  children: React.ReactNode;
}


// Route 요소인지 확인하는 타입 가드
function isRouteElement(
  element: React.ReactNode
): element is React.ReactElement<RouteProps> {
  return isValidElement<RouteProps>(element) && "path" in element.props;
}

export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => { 
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]); // children이나 currentPath가 바뀔 때만 다시 계산되도록 최적화

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};