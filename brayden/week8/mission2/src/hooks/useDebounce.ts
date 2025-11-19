import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  // value가 어떤 타입인지 모르기 때문에 제네릭 T 사용, delay는 몇 초 후에 실행할 것인지 시간 설정
  const [debouncedValue, setDebouncedValue] = useState<T>(value); // 초기값 : value

  // value, delay가 변경될 때마다 실행
  useEffect(() => {
    // delay(ms) 후에 실행됩니다.
    // delay 시간 후에 value를 debouncedValue로 업데이트하는 타이머를 시작합니다.
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    // setTimeout() : 지연 시간(delay) 뒤에 특정 코드를 실행
    // 여기서 특정 코드는 () => setDebouncedValue(value)를 말함.
    // 즉, delay 시간 뒤에 setDebouncedValue를 통해 value 값을 상태 업데이트함.

    // value가 변경되면, 기존 타이머를 지워서 업데이트를 취소
    // 값이 계쏙 바뀔 때마다 마지막에 멈춘 값만 업데이트
    // useEffect에서 return을 사용하는 경우는 2가지이다.

    // 1. value가 달라져서 이전 effect를 청소해야하는 경우
    // 2. 해당 컴포넌트가 언마운트 되는 경우
    
    // 여기서는 1번 경우에 속하며 useEffect의 의존성 배열에 있는 value 값이 바뀔 경우
    // 이전 useEffect는 정리해주고 새로운 handler를 만들어야 하므로 return clearTimeout(handler)로 남은 시간을 삭제
    // 만약 delay가 다 지났을 경우 setDebouncedValue(value)를 통해 debouncedValue에 최종 값이 저장되고
    // 이 최종 값을 반환
    return () => clearTimeout(handler);
  }, [value, delay]);

  // 최종적으로 '잠시 기다린 후의' 값을 반환한다.
  return debouncedValue;
}

export default useDebounce;
