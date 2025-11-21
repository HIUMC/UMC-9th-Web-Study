import { useReducer, useState } from "react";

// useReducer의 타입정의

// 1. state에 대한 인터페이스 정의
interface IState {
  counter: number;
  error: string | null;
}
// 2. reducer에 대한 인터페이스 정의
interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
  payload?: number;
}
// 3. reducer 함수 정의
function reducer(state: IState, action: IAction) {
  const { type, payload } = action;
  console.log(action); // payload : 전달할 값
  console.log(state);

  switch (type) {
    case "INCREASE": {
      return { ...state, counter: state.counter + payload }; // 원본 직접 조작
    }
    case "DECREASE": {
      return { ...state, counter: state.counter - payload }; // 1 - undefined = NaN
    }
    case "RESET_TO_ZERO": {
      return { ...state, counter: (state.counter = 0) };
    }
    default:
      return state;
  }
}
function UseReducerPage() {
  // 1. useState
  const [count, setCount] = useState(0);

  // 2. useReducer
  // state : 상태
  // dispatch : 상태를 변경하는데 상태의 "복사본" 형태를 만든 후 그 복사본에 변경 사항 저장
  // -> 데이터를 사본 상태를 만들어서 변이 시키는 함수
  const [state, dispatch] = useReducer(reducer, { counter: 0, error: null });

  const handleIncrease = () => {
    setCount(count + 1);
  };

  console.log(state);

  return (
    <div className="flex flex-col h-screen gap-20 justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl">useState훅 사용 : {count}</h1>
        <button
          className="border-2 rounded-xl p-2 bg-gray-500 text-white"
          onClick={handleIncrease}
        >
          Increase
        </button>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-3xl">useReducer훅 사용 : {state.counter}</h1>
        <button
          className="border-2 rounded-xl p-2 bg-gray-500 text-white"
          onClick={() => dispatch({ type: "INCREASE", payload: 3 })}
        >
          Increase
        </button>
        <button
          className="border-2 rounded-xl p-2 bg-gray-500 text-white"
          onClick={() => dispatch({ type: "DECREASE", payload: 3 })}
        >
          Decrease
        </button>
        <button
          className="border-2 rounded-xl p-2 bg-gray-500 text-white"
          onClick={() => dispatch({ type: "RESET_TO_ZERO" })}
        >
          RESET_TO_ZERO
        </button>
      </div>
    </div>
  );
}

export default UseReducerPage;
