import React, { useReducer, useState } from "react";

// (1) state에 대한 interface
interface IState {
  counter: number;
}

// (2) reducer에 대한 interface
interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
  payload: number;
}

function reducer(state: IState, action: IAction) {
  const { type, payload } = action;

  switch (type) {
    case "INCREASE": {
      return {
        ...state,
        counter: state.counter + payload,
      };
    }
    case "DECREASE": {
      return {
        ...state,
        counter: state.counter - payload,
      };
    }
    case "RESET_TO_ZERO": {
      return {
        ...state,
        counter: payload,
      };
    }
    default:
      return state;
  }
}

export default function UseReducerpage() {
  // 1. useState
  const [count, setCount] = useState(0);

  // 2. useReducer : 데이터를 직접 변경시키는게 아닌 사본을 변형
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl">useState</h2>
        <h2>useState훅 사용: {count}</h2>
        <button onClick={handleIncrease}>Increase</button>
      </div>
      <div>
        <h2 className="text-3xl">useReducer</h2>
        <h2>useState훅 사용: {state.counter}</h2>
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
              payload: 3,
            })
          }
        >
          Decrease
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "RESET_TO_ZERO",
              payload: 10,
            })
          }
        >
          RESET_TO_ZERO
        </button>
      </div>
    </div>
  );
}
