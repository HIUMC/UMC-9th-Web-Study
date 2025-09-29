export type LinkProps = () => {
  to: string;
  children: React.ReactNode;
};

export type RouteProps = {  
  path: string;
  component: React.ComponentType;
};  

export type RoutesProps = {
  children: React.ReactNode;
};