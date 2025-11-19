import { useEffect, useState } from "react";

function useDebounce<T>(value : T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 시간 후에 value를 devouncedValue로 업데이트하는 타이머를 시작합니다
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // value가 변경되면 이전 타이머를 정리합니다
    return () => {
      clearTimeout(handler);
    };
},[value, delay]);

// 최종적으로 잠시 기다린 후의 값을 반환합니다
  return debouncedValue;
}
export default useDebounce;