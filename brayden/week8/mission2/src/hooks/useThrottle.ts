// import { useCallback, useRef } from "react";

// export function useThrottleFn<T>(fn: (...args: T[]) => void, delay: number) {
//   // fn이라는 함수를 매개변수로 받을 수 있는데 fn의 인자들은 T(제네릭) 타입이다, delay는 number 타입(<- 시간)
//   const lastExecuted = useRef(0);
//   // useRef 사용 시 상태가 리렌더링 없이 유지됨
//   // 마지막으로 실행됐던 시간을 저장

//   return useCallback(
//     (...args: T[]) => {
//       // 리렌더링될 때마다 새로운 throttled 함수가 생성되지 않도록
//       // fn, delay가 바뀔 때마다 새 함수를 생성
//       const now = Date.now(); // 현재 시간

//       if (now - lastExecuted.current < delay) return;
//       // 현재 시간 - 마지막으로 실행된 시간 이 delay보다 작다면
//       // 즉, 충분한 시간이 아직 지나지 않았다면 함수 실행 X

//       // 충분한 시간이 지났다면(delay보다 더 지났다면)
//       // 마지막으로 실행됐던 시간을 현재로 설정
//       lastExecuted.current = now;

//       // 함수 실행
//       fn(...args);
//     },
//     [fn, delay]
//   );
// }

// useThrottle : 주어진 값이 자주 변경될 때
// 최소 interval 간격으로만 업데이트 해서 성능을 개선한다

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500): T {
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
