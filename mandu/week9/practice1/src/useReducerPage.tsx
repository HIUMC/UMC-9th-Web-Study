import { useReducer, useState } from "react";

interface IState {
  counter: number;
}

interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
}

function reducer(state: IState, action: IAction) {
  const { type } = action;

  switch (type) {
    case "INCREASE":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "DECREASE":
      return {
        ...state,
        counter: state.counter - 1,
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
export default function UseReducerPage() {
  const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div>
        <h1>useState</h1>
        <h2>useState 훅 사용: {count}</h2>
        <button onClick={handleIncrease}>Increase</button>
      </div>
      <div>
        <h1>useReducer</h1>
        <h2>useReducer 훅 사용: {state.counter}</h2>
        <button onClick={() => dispatch({ type: "INCREASE" })}>Increase</button>
        <button onClick={() => dispatch({ type: "RESET_TO_ZERO" })}>
          Reset
        </button>
        <button onClick={() => dispatch({ type: "DECREASE" })}>Decrease</button>
      </div>
    </div>
  );
}
