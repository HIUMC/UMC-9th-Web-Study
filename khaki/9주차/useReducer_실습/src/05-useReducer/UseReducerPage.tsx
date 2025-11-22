import { useReducer, useState } from "react";

// 1. state에 대한 타입 정의
interface State {
  counter: number;
}

// 2. action에 대한 타입 정의
type Action = {
  type: "INCREASE" | "DECREASE" | "RESET";
  payload?: number;
};

// 3. reducer 함수 정의
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREASE":
      return { counter: state.counter + (action.payload || 1) };
    case "DECREASE":
      return { counter: state.counter - (action.payload || 1) };
    case "RESET":
      return { counter: 0 };
    default:
      return state;
  }
};

export const UseReducerPage = () => {
  // 1. useState를 사용한 카운터 예제
  const [count, setCount] = useState(0);
  const handleIncreasement = () => {
    setCount(count + 1);
  };

  // 2. useReducer를 사용한 카운터 예제
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  return (
    <div className="flex flex-col items-center gap-8 mt-20">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl">useState: {count}</h2>
        <button onClick={handleIncreasement} className="border border-black px-4 py-2 mt-4">
          increase
        </button>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-3xl">useReducer: {state.counter}</h2>
        <button onClick={() => dispatch({ type: "INCREASE" })} className="border border-black px-4 py-2 mt-4">
          increase
        </button>
        <button onClick={() => dispatch({ type: "DECREASE" })} className="border border-black px-4 py-2 mt-4">
          decrease
        </button>
        <button onClick={() => dispatch({ type: "RESET" })} className="border border-black px-4 py-2 mt-4">
          reset
        </button>
      </div>
    </div>
  );
};
