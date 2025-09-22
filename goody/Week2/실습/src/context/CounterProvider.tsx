import {createContext, useContext, useState, type ReactNode} from 'react'

interface CounterContextType{
    count : number;
    handleIncrease: () => void;
    handleDecrease: () => void;

}

export const CounterContext = createContext<CounterContextType | undefined>(
    undefined
)

export const CounterProvider = ({children}: {children:ReactNode}) => {
    const [count,setCount] = useState(0)

    const handleIncrease = () => setCount((prev)=>prev+1)
    const handleDecrease = () => setCount((prev)=>prev-1)

    return (
        <CounterContext.Provider
        value={{count, handleIncrease, handleDecrease}}
        >
            {children}
        </CounterContext.Provider>
    )
}


export const useCount = () => {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error(
            'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
        )
    }
    return context
}