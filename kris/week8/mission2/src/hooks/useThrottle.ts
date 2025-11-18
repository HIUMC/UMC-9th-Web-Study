// 주어진 값 or 상태가 자주 변경될 때
// 최소 interval 간격으로 업데이트하여 성능 개선

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number): T {
  // 1. 상태 변수: throttledValue(최종적으로 쓰로틀링 적용된 값 저장)

  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 2. Ref lastExecuted(마지막으로 값이 업데이트된 시간 저장)
  // useRef: 컴포넌트 리렌더링 되어도 값 유지
  const lastExecuted = useRef<number>(Date.now());

  // 3. useEffect: value, delay 변경될 때마다 실행
  useEffect(() => {
    // 현재 시각과 lastExecuted.current에 저장된 마지막 시각 + delay 비교
    if (Date.now() - lastExecuted.current >= delay) {
      lastExecuted.current = Date.now(); // lastExecuted.current 업데이트
      setThrottledValue(value); // throttledValue 업데이트
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
      }, delay);
      // 클린업 함수: 타이머 정리
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  // 4. 최종적으로 쓰로틀링 적용된 값 반환
  return throttledValue;
}

export default useThrottle;
