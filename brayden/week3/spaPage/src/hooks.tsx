import { useSyncExternalStore } from "react";

/**
 * 외부 스토어(Browser History API)의 변경 사항을 구독하는 함수입니다.
 * 'popstate' (브라우저 뒤로/앞으로 가기)와 'pathchange' (프로그래매틱한 라우팅) 이벤트를 감지합니다.
 * @param {() => void} callback - 스토어 변경 시 호출될 콜백 함수
 * @returns {() => void} 구독을 해지하는 클린업 함수
 */
const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  window.addEventListener("pathchange", callback);

  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("pathchange", callback);
  };
};

/**
 * 스토어의 현재 스냅샷(현재 경로)을 반환하는 함수입니다.
 * @returns {string} window.location.pathname
 */
const getSnapshot = () => {
  return window.location.pathname;
};

/**
 * 현재 경로를 상태로 관리하고, 경로 변경 시 컴포넌트를 리렌더링하는 커스텀 훅입니다.
 * useEffect를 사용하지 않고 외부 스토어(Browser History)를 구독하기 위해
 * React 18의 useSyncExternalStore 훅을 사용합니다.
 * @returns {string} 현재 경로
 */
export const useCurrentPath = () => {
  const currentPath = useSyncExternalStore(subscribe, getSnapshot);
  return currentPath;
};
