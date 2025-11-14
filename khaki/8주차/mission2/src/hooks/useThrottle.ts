import { useCallback, useRef } from "react";

export function useThrottle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  // 1. useRef: 마지막으로 값을 업데이트한 시간 기록
  const lastExecuted = useRef(0);

  // 이 반환값이 handleScroll
  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      // delay 이상 시간이 지나면 실행
      if (now - lastExecuted.current >= delay) {
        lastExecuted.current = now;
        fn(...args);
      }
    },
    [fn, delay]
  ) as T;
}
