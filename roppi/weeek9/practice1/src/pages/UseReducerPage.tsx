import { useReducer, useState } from "react";

// 1. state에 대한 interface 작성
interface IState {
  counter: number;
}

// 2. reducer에 대한 type 작성
interface IAction {
  type: 'INCREASE' | 'DECREASE' | 'RESET_TO_ZERO';
}

function reducer(state: IState, action: IAction): IState {
  const { type } = action;
  switch (type) {
    case 'INCREASE':  
      return { counter: state.counter + 1 };
    case 'DECREASE':
      return { counter: state.counter - 1 }; 
    case 'RESET_TO_ZERO':
      return { counter: 0 };
    default:
      return state;
  }
} 

const UseReducerPage = () => {
  // 1. useState를 이용한 카운터 구현
  const [count, setCount] = useState(0)

// 2. useReducer를 이용한 카운터 구현
  const [state, dispatch] = useReducer(reducer, {
    counter: 0,
  });

  const handleIncrease = () => {
    setCount(count + 1)
  }

  return (
  <div className="flex flex-col gap-10">
    <div>
      <div>useState</div>
      <h1>{count}</h1>
      <button onClick={handleIncrease}>+</button>
    </div>
    <div>
      <div>useReducer</div>
      <h1>{state.counter}</h1>
      <button onClick={() : void => dispatch({
        type: 'INCREASE',
      })
      }
      >+</button>
    <button onClick={() : void => dispatch({
        type: 'DECREASE',
      })
      }
      >-</button>
    <button onClick={() : void => dispatch({
        type: 'RESET_TO_ZERO',
      })
      }
      >RESET</button>
    </div>

  </div>

  )
};

export default UseReducerPage;
