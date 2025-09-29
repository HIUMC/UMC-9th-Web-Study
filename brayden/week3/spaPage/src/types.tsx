import type { FC, ReactElement, ReactNode } from "react";

// Link 컴포넌트의 props 타입
export interface LinkProps {
  to: string; // 이동할 경로
  children: ReactNode; // 자식 요소
}

// Route 컴포넌트의 props 타입
export interface RouteProps {
  path: string; // 렌더링될 경로
  component: FC; // 해당 경로에서 렌더링할 컴포넌트
}

// Routes 컴포넌트의 props 타입
export interface RoutesProps {
  children: ReactNode; // Route 컴포넌트들의 배열
}

// 주어진 자식 요소가 유효한 Route 엘리먼트인지 확인하는 타입 가드입니다.
export const isRouteElement = (
  child: ReactNode
): child is ReactElement<RouteProps> => {
  // React.Fragment 같은 다른 타입의 자식을 걸러내기 위해 props.path 존재 여부를 확인합니다.
  return (child as ReactElement<RouteProps>).props.path !== undefined;
};
