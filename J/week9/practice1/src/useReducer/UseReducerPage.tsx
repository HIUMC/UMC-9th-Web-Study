import { useReducer, useState } from "react"

// 1. state에 대한 interface
interface IState {
    counter: number;
}

// 2. reducer에 대한 interface
interface IAction {
    type: 'INCREASE' | 'DECREASE' | 'RESET_TO_ZERO';
    payload?: number;
}

function reducer(state: IState, action: IAction) {
    const { type, payload } = action;
    

    switch (type) {
        case 'INCREASE': {
            return {
                ...state,
                counter: state.counter + payload!,
            };
        }
        case 'DECREASE': {
            return {
                ...state,
                counter: state.counter - payload!,
            };
        }
        case 'RESET_TO_ZERO': {
            return {
                ...state,
                counter: 0,
            };
        }
        default:
            return state;    
    }
}


export default function UseReducerPage() {
    // 1. useState
    const [count, setcount] = useState(0);

    // 2. useReducer
    const [state, dispatch] = useReducer(reducer, {
        counter: 0,
    })

    const handleIncrease = () => {
        setcount(count + 1);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10 h-screen bg-neutral-800 text-white">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl">useState</h2>
                <h2>useState 훅 사용: {count}</h2>
                <button onClick={handleIncrease} className="bg-neutral-900 py-1 px-2 rounded-lg">Increase</button>
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-3xl">useReducer</h2>
                <h2>useReducer 훅 사용: {state.counter}</h2>
                <div className="flex flex-row gap-3">
                    <button onClick={() =>
                        dispatch({
                            type: 'INCREASE',
                            payload: 3,
                        })}
                        className="bg-neutral-900 py-1 px-2 rounded-lg"
                    >
                        Increase
                    </button>
                    <button onClick={() =>
                        dispatch({
                            type: 'DECREASE',
                            payload: 3,
                        })}
                        className="bg-neutral-900 py-1 px-2 rounded-lg"
                    >
                        Decrease
                    </button>
                    <button onClick={() =>
                        dispatch({
                            type: 'RESET_TO_ZERO',
                        })}
                        className="bg-neutral-900 py-1 px-2 rounded-lg"
                    >   
                        reset
                    </button>
                </div>
            </div>
        </div>
    )
}