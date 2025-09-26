import { useState } from "react";

function App() {
  const [count, setCount] = useState<number>(0);
  // count : 0(초기값)
  // count 변경 : setCount 사용

  const handleIncreaseNumber = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1); // 이전 상태 값을 인자로 받아서 업데이트 -> 한번에 6씩 증가
  };
  // 함수로 따로 빼서 사용해도 가능

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleIncreaseNumber}>숫자 증가</button>
      {/* setCount() 괄호 안의 숫자로 새롭게 상태 값 지정 */}
    </>
  );
}

export default App;

// 초기값이 명확(ex. 0) -> 타입 생략 가능 / 초기값이 null or undefined -> 제네릭 명시하기
// const [value, setValue] = useState<string | null>(null);
