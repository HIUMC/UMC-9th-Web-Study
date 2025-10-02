import { useEffect, useState } from "react";

export default function UseEffectError() {
  const [counter, setCounter] = useState(0);

  const handleIncrease = () => {
    setCounter((counter) => counter + 1);
  };

  useEffect(
    () => {
      // 1. 초기 렌더링 시작(counter ++)
      setCounter((counter) => counter + 1);
    },
    // 2. counter 값이 변경될 때마다 실행
    []
  );
  // 1,2가 반복해서 일어나니까 무한렌더링 발생
  return <div onClick={handleIncrease}>123</div>;
}

// useEffect 안에 상태를 업데이트 하는 함수를 넣으면 안됨
// 이유 : 무한히 증가해버림 + dependency array 없이 사용하면 매번 발생함
