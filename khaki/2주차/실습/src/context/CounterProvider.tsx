import { createContext, useContext, useState, ReactNode } from 'react';

// Context의 타입 정의
// Context도 결국엔 객체이다.
interface CounterContextType {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

// Context 생성 (초기값은 undefined로 설정)
export const CounterContext = createContext<CounterContextType | undefined>(
  undefined
);
// createContext : React에서 Context 객체를 만드는 함수.
// createContext<Type>(defaultValue)
// Type : 그 Context가 관리할 값(value)의 타입을 지정
// defaultValue : 인자로 넘긴 객체 전체가 초기값이 된다.
// CounterContext라는 이름의 Context를 만듬
// 이 context객체에는 Provider와 Consumer가 자동으로 생긴다.

// Context Provider 생성
export const CounterProvider = ({ children }: { children: ReactNode }) => {
  // props로 children을 받음
  // children의 타입을 ReactNode로 지정 → React에서 렌더링 가능한 모든 걸 의미합니다 (태그, 문자열, 숫자 등).
  
  const [count, setCount] = useState(0);
  // 상태 정의

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => prev - 1);
	
  return (
    <CounterContext.Provider   
    // Provider는 Context 값을 공급하는 역할.(기본제공 컴포넌트)
      value={{ count, handleIncrement, handleDecrement }}
      // value={...}에 넣은 게 모든 하위 컴포넌트로 전달돼요.
    >
      {children} 
    </CounterContext.Provider>
    //{children}: Provider 안에 들어온 자식 컴포넌트들을 실제로 화면에 렌더링
  );
};