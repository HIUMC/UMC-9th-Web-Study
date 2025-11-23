import { useReducer, useState } from "react"

// 1. state에 대한 interface
interface IState {
    counter : number;
}

// 2. reducer에 대한 interface 
interface IAction {
    type : 'INCREASE' | 'DECREASE' | 'RESET_TO_ZERO';
    // payload? : number; // 전달 할 값 
}

// 3. reducer에 대한 함수
function reducer(state : IState, action: IAction) {
    const {type} = action;
    switch(type){
        case "INCREASE": 
            {
                return {
                    ...state, // 에러 값 등을 잃어버리지 않도록 원본 배열을 유지시켜주어야함. => 스프레드 연산자 이용
                    counter : state.counter + 1,
                };
            }
        case "DECREASE":
            {
                return {
                    ...state,
                    counter : state.counter - 1,
                };
            }
        case "RESET_TO_ZERO":
            {
                return {
                    ...state,
                    counter : 0,
                }
            }
        default: return state;
    }
} 

export default function UseReducerPage() {
    // 1. useState 
    const [count,setCount] = useState(0);

    // 2. useReducer
    // dispatch : action 사본 state 형태를 만들어 수정
    const [state, dispatch] = useReducer(reducer,{
        counter : 0,
    })

    const handleIncrease = () => {
        setCount(count+1);
    };
    
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <div>
                <h2 className="text-3xl">useState</h2>
                <h2>useState 훅 사용 : {count}</h2>
                <button onClick={handleIncrease}>Increase</button>
            </div>
            <div>
                <h2 className="text-3xl">useReducer</h2>
                <h2>useReducer 훅 사용 : {state.counter}</h2>
                <button onClick={() => dispatch({type : 'INCREASE',})}>Increase</button>
                <button onClick={() => dispatch({type : 'DECREASE'})}>Decrease</button>
                <button onClick={() => dispatch({type : 'RESET_TO_ZERO'})}>Reset</button>
            </div>
        </div>
    );
}
