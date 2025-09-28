
export interface RouteProps {
  path: string; // 어떤 경로와 매칭될지
  component: React.ComponentType;
}

export const Route = ({ component: Component }: RouteProps) => {
  return <Component />;
};