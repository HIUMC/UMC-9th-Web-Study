import { Children, cloneElement, useMemo, type FC } from "react";
import type { RoutesProps } from "../types/RoutesProps";
import { useCurrentPath } from "../hooks/useCurrentPath";
import isRouteElement from "../utils/isRouteElement";

// Router.tsx
export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);
  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};