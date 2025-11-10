/**
 * ========================================
 * 애플리케이션 진입점 (Entry Point)
 * ========================================
 *
 * React 애플리케이션을 DOM에 마운트하는 진입점 파일입니다.
 *
 * 주요 역할:
 * 1. React Root 생성
 * 2. StrictMode로 애플리케이션 감싸기
 * 3. 전역 스타일 (index.css) 임포트
 *
 * StrictMode:
 * - 개발 모드에서 잠재적 문제를 감지하는 도구
 * - 부작용(side-effects)을 감지하기 위해 컴포넌트를 두 번 렌더링
 * - 프로덕션 빌드에는 영향 없음
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // 전역 스타일 임포트
import App from "./App.tsx";

/**
 * React 18의 createRoot API를 사용하여 애플리케이션 마운트
 *
 * 동작 순서:
 * 1. document.getElementById('root')로 HTML의 root 엘리먼트 찾기
 * 2. createRoot()로 React Root 생성
 * 3. StrictMode로 감싼 App 컴포넌트를 렌더링
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
