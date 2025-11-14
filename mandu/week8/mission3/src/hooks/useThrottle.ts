// useThrottle.ts (수정된 코드)

import { useRef, useCallback, useEffect } from "react";

// T는 함수 타입을 의미합니다.
function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay = 500
) {
  // 1. 함수 호출을 제어하기 위한 "waiting" 상태
  const isWaiting = useRef(false);

  // 2. 콜백 함수가 변경될 수 있으므로 ref에 저장
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 3. useCallback을 사용해 쓰로틀링된 함수를 memoization
  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      // 4. "waiting" 상태이면 (즉, 딜레이 시간 중이면) 아무것도 하지 않음
      if (isWaiting.current) {
        return;
      }

      // 5. 함수를 실행
      callbackRef.current(...args);

      // 6. 실행 후 "waiting" 상태로 변경
      isWaiting.current = true;

      // 7. delay 시간이 지나면 "waiting" 상태를 해제
      setTimeout(() => {
        isWaiting.current = false;
      }, delay);
    },
    [delay]
  );

  return throttledCallback;
}

export default useThrottle;
