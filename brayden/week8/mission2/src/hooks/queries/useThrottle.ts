import { useCallback, useRef } from "react";

export function useThrottleFn<T>(fn: (...args: T[]) => void, delay: number) {
  // fn이라는 함수를 매개변수로 받을 수 있는데 fn의 인자들은 T(제네릭) 타입이다, delay는 number 타입(<- 시간)
  const lastExecuted = useRef(0);
  // useRef 사용 시 상태가 리렌더링 없이 유지됨
  // 마지막으로 실행됐던 시간을 저장

  return useCallback(
    (...args: T[]) => {
      // 리렌더링될 때마다 새로운 throttled 함수가 생성되지 않도록
      // fn, delay가 바뀔 때마다 새 함수를 생성
      const now = Date.now(); // 현재 시간

      if (now - lastExecuted.current < delay) return;
      // 현재 시간 - 마지막으로 실행된 시간 이 delay보다 작다면
      // 즉, 충분한 시간이 아직 지나지 않았다면 함수 실행 X

      // 충분한 시간이 지났다면(delay보다 더 지났다면)
      // 마지막으로 실행됐던 시간을 현재로 설정
      lastExecuted.current = now;

      // 함수 실행
      fn(...args);
    },
    [fn, delay]
  );
}
