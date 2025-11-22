import { useReducer, useState } from "react";

export default function UseReducerPage() {
  const [count, setCount] = useState(0);

  // 1. state에 대한 interface
  interface IState {
    counter: number;
  }
  // 2. reducer에 대한 interface
  interface IAction {
    type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
    payload?: number;
  }

  function reducer(state: IState, action: IAction) {
    const { type, payload } = action;
    switch (type) {
      case "INCREASE":
        return {
          ...state, // 원본 값 보존
          counter: state.counter + payload!,
        };
      case "DECREASE":
        return {
          ...state,
          counter: state.counter - payload!,
        };
      case "RESET_TO_ZERO":
        return {
          ...state,
          counter: 0,
        };
      default:
        return state;
    }
  }
  // 사본을 조작
  const [state, dispatch] = useReducer(reducer, {
    counter: 0,
  });

  const handleIncrese = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div>
        <h2 className="text-3xl">useState</h2>
        <h2 className="text-2xl">useState 사용: {count}</h2>
        <button onClick={handleIncrese} className="border-1 border-black">
          Increase
        </button>
      </div>
      <div>
        <h2 className="text-3xl">useReducer</h2>
        <h2 className="text-2xl">useReducer 사용: {state.counter}</h2>
        <button
          onClick={() =>
            dispatch({
              type: "INCREASE",
              payload: 3,
            })
          }
          className="border-1 border-black"
        >
          Increase
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "DECREASE",
              payload: 2,
            })
          }
          className="border-1 border-black"
        >
          Decrease
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "RESET_TO_ZERO",
            })
          }
          className="border-1 border-black"
        >
          Reset to Zero
        </button>
      </div>
    </>
  );
}
