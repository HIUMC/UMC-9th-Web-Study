import { useMemo, Children, cloneElement, isValidElement } from "react";
import type { FC, ReactElement, ReactNode } from "react";

import { Route } from "./Route";
import { useCurrentPath } from "./useCurrentPath";

// isRouteElement 타입 가드
const isRouteElement = (element: ReactNode): element is ReactElement<{ path: string }> => {
  return isValidElement(element) && element.type === Route;
};

export const Routes: FC<{ children: ReactNode }> = ({ children }) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);
  
  if (!activeRoute) {return null;}

  return cloneElement(activeRoute);
};