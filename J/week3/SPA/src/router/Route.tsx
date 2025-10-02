import type { RouteProps } from "../types/RouteProps";

// Route.tsx
export const Route = ({ component: Component }: RouteProps) => {
  return <Component />;
};