import { ReactElement, isValidElement } from "react";
import type { RouteProps } from "../types/RouteProps";

// 타입 가드 함수
export default function isRouteElement(
  element: unknown
): element is ReactElement<RouteProps> {
  return (
    isValidElement(element) && 
    element.props !== undefined &&
    "path" in element.props
  );
}
