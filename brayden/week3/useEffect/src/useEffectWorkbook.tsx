import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("컴포넌트가 처음 마운트될 때 실행됩니다!");
  }, []);

  useEffect(() => {
    console.log(`count 값이 ${count}로 변경될 때마다 실행됩니다!`);
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1 증가</button>
    </>
  );
}

export default App;

// 화면을 그리는 것 자체와는 직접적으로 관련이 없지만, 컴포넌트가 동작하면서 부수적으로 필요한 작업 => 부수효과(side effect)
// 예시 : 백엔드 REST API를 호출해서 데이터를 가져오기(Read), 데이터 생성(create), 수정(update), 삭제(delete) 요청보내기
// , 이벤트 리스너 등록/해제하기, 타이머(setInterval, setTimeout) 설정하기
// 이런 side effect를 안전하게 다루기 위해 useEffect 훅을 제공

// useEffect의 발동 조건
// 1. 처음 마운트될 때만 실행 -> API를 딱 한번만 호출하고 싶을 때
// 2. 특정 값이 변경될 때 실행 -> 예를 들어 searchKeyword 값이 바뀔 때마다 API 호출
// 3. 컴포넌트가 리렌더링될 때마다 실행 -> 별도의 제약 없이 실행

/*
import {useEffect} from 'react';
useEffect(() => {
  // 실행할 부수효과 코드(예: API 호출, 이벤트 등록 등)
  // 첫 번째 인자(Callback function) : 실행할 동작을 함수로 작성, 예시 : fetch로 데이터 불러오기, 이벤트 리스너 등록 등
}, []
  // 두 번째 인자(Dependency Array, 의존성 배열) : 이 배열에 들어간 값이 변할 때만 실행됨.
  // [](빈 배열) -> 컴포넌트가 처음 마운트될 때 한번만 실행
  // [state] -> state 값이 바뀔 때마다 실행
  // (생략) -> 컴포넌트가 리렌더링될때마다 실행
);

*/
