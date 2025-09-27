import { useEffect, useState } from "react";

const SearchPage = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prev) => prev + 1);
  };

  useEffect(() => {
    const mouseClickEffectEvent = () => {
      console.log(counter);
    };

    window.addEventListener("click", mouseClickEffectEvent);
    // 이건 화면 어디든 클릭하면 counter를 콘솔에 출력

    // 클린업 함수
    return () => {
      console.log("클린업 함수 실행!", counter);
      window.removeEventListener("click", mouseClickEffectEvent);
    };
  }, [counter]);

  return (
    <>
      <h1 style={{ color: "white" }}>{counter}</h1>
      <button onClick={handleClick}>+</button>
    </>
  );
};

export default SearchPage;


// <동작 흐름>
/*
1) 마운트될 때 (처음 화면에 나타날 때)
useEffect 실행
mouseClickEffectEvent 함수 정의
window.addEventListener("click", mouseClickEffectEvent) 등록됨
👉 이제 화면 어디든 클릭하면 counter 값 콘솔 출력됨.

2) 버튼 클릭해서 counter 변경
setCounter → counter가 바뀌면 컴포넌트 리렌더링
useEffect는 [counter] 의존성 때문에 다시 실행됨
  - 먼저 이전 effect의 클린업 함수 실행
    → 콘솔에 "클린업 함수 실행! (이전 counter)" 찍히고,
    → 이전에 등록한 이벤트 리스너 제거됨.
  - 새로운 mouseClickEffectEvent 함수 생성
  - 다시 addEventListener로 등록

  👉 즉, 항상 최신 counter를 콘솔에 찍을 수 있게 이벤트 핸들러를 교체하는 것.

3) 언마운트될 때 (화면에서 사라질 때)
useEffect의 마지막 클린업 함수 실행
등록해둔 이벤트 리스너 제거
메모리/이벤트 누수 방지 ✅

*/