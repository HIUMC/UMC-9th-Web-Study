export interface RouteProps {
  path : string;
  Component : React.ComponentType<any>;
}

// Routes에서 경로는 이미 다 정해주므로 path는 받을 필요 없음
export const Route = ({Component}: RouteProps) => {
  return <Component />;
};