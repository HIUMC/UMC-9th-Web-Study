export interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export interface RouteProps {
  path: string;
  component: React.ComponentType;
}

export interface RoutesProps {
  children: React.ReactNode;
}
