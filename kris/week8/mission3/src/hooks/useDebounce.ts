import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // value, delay 변경될 때마다 실행
  useEffect(() => {
    // delay(ms) 후에 실행
    // delay 시간 후 value를 debouncedValue로 바꾸는 작업 실행
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // value가 변경되면 기존 타이머 지워서 업데이트 취소
    // 값이 바뀔 때마다 마지막에 담긴 값만 업데이트
    return () => clearTimeout(handler)
  }, [value, delay])

  // 최종적으로 debounce된 값 반환
  return debouncedValue;
}

export default useDebounce