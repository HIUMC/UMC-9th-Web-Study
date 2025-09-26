import { Children, cloneElement, isValidElement, useMemo, type FC, type MouseEvent, type ReactElement } from 'react';
import type { LinkProps, RouteProps } from './types.ts';
import { getCurrentPath, navigateTo } from './utils.tsx';

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (getCurrentPath() === to) return;
    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export const Route = ({ path, component }: RouteProps) => {
  return null;
};

function isRouteElement(child: any): child is ReactElement<RouteProps> {
  return isValidElement(child) && 'path' in child.props;
}

export const Routes: FC<RouteProps> = ({ children, currentPath }) => {
  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  const Component = activeRoute.props.component;
  return <Component />;
};