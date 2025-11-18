// useThrottle : 주어진 값이 자주 변경될 때
// 최소 interval 간격으로만 업데이트 해서 성능을 개선한다

import { useEffect, useRef, useState } from "react";


function useThrottle<T>(value: T, delay: number = 500 ): T {
  // 1. 상태변수 : throttledValue (최종 반환값)
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 2. Ref lastExecutedTime : 마지막 업데이트 시점
  // ref는 값이 바뀌어도 리렌더링이 발생하지 않는다
  const lastExecutedTimeRef = useRef<number>(Date.now());

  // 3. useEffect : value 값이 바뀔 때마다 실행
  useEffect(() => {
    const now = Date.now();

    if (now >= lastExecutedTimeRef.current + delay) {
      // 마지막 실행 시점으로부터 delay 시간이 지났으면
      // 값을 바로 업데이트
      setThrottledValue(value);
      lastExecutedTimeRef.current = now;
    } else {
      // 그렇지 않으면 delay 시간 후에 업데이트 예약
      const timeoutId = setTimeout(() => {
        setThrottledValue(value);
        lastExecutedTimeRef.current = Date.now();
      }, delay);

      // cleanup 함수에서 타임아웃 해제
      return () => clearTimeout(timeoutId);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle; 