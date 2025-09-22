import { useReducer, useState } from "react";

// 1. state에 대한 interface 정의
interface IState {
  counter: number;
}
// 2. reducer에 대한 interface 정의
interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
  payload?: number;
}

function reducer(state: IState, action: IAction) {
  const { type } = action;

  switch (type) {
    case "INCREASE": {
      return {
        ...state,
        counter: state.counter + 1,
        // 원본 값을 유지해야한다.
      };
    }
    case "DECREASE": {
      return {
        ...state,
        counter: state.counter - 1,
        // 원본 값을 유지해야한다.
      };
    }
    case "RESET_TO_ZERO": {
      return {
        ...state,
        counter: 0,
        // 원본 값을 유지해야한다.
      };
    }
    default:
      return state;
  }
}

export default function UseReducerPage() {
  // 1. useState
  const [count, setCount] = useState(0);

  // 2. useReducer
  const [state, dispatch] = useReducer(reducer, {
    counter: 0,
  });
  // state : 상태, dispatch : dispatch 안에 action 함수를 정의하여 state의 복사본 형태를 만들어주고, 몇 가지 변경을 한 다음에
  // 사본으로 돌아가서 새로운 상태를 만드는, 불변성을 가지는 함수 => 데이터를 직접 변경이 아닌 사본을 만들어 변이시키는 방식

  const handleIncrease = (): void => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <h2 className="text-3xl">useState</h2>
        <h2>useState훅 사용 : {count}</h2>
        <button onClick={handleIncrease}>Increase</button>
      </div>
      <div>
        <h2 className="text-3xl">useReducer</h2>
        <h2>useSReducer훅 사용 : {state.counter}</h2>
        <button
          onClick={() =>
            dispatch({
              type: "INCREASE",
              payload: 3,
            })
          }
        >
          Increase
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "DECREASE",
            })
          }
        >
          Decrease
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "RESET_TO_ZERO",
            })
          }
        >
          RESET_TO_ZERO
        </button>
      </div>
    </>
  );
}
