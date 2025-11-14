import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  // 이 hook을 사용하는 컴포넌트의 상태가 된다.
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // value나 delay가 바뀔 때마다 실행
  useEffect(() => {
    // setTimeout(실행할 함수, 지연 시간(ms)): 일정 시간이 지난 후에 특정 작업을 수행
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup 함수: 검색어가 바뀌어 handler가 다시 실행되기 전에 이전 타이머를 정리
    return () => {
      clearTimeout(handler); // 이전 타이머를 취소
    };
  }, [value, delay]); // value나 delay가 바뀔 때마다 재실행

  // 최종적으로 디바운스된 값을 반환
  return debouncedValue;
}
