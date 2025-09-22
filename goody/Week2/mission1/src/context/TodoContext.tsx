import { createContext, useContext, useState, type PropsWithChildren } from "react"
import type { TTodo } from "../types/todo"

interface ITodoContext {
    todos : TTodo[]
    doneTodos : TTodo[]
    addTodo: (text:string) => void
    completeTodo : (todo: TTodo) => void
    deleteTodo : (todo: TTodo) => void
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined)

export const TodoProvider = ({children} : PropsWithChildren) => { // {children} : {children:ReactNode} 도 가능

    const [todos, setTodos] = useState<TTodo[]>([])
    const [doneTodos,setDoneTodos] = useState<TTodo[]>([])

    const addTodo = (text: string) => {
        const newTodo: TTodo = { id: Date.now(), text}
        setTodos((prevTodos): TTodo[]=>[...prevTodos, newTodo])
        
    }

    const completeTodo = (todo : TTodo) => {
        setTodos((prevTodos) => prevTodos.filter((t) : boolean => t.id != todo.id))
        setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo])
    }

    const deleteTodo = (todo : TTodo) => {
        setDoneTodos((prevdoneTodo)=> prevdoneTodo.filter((t) : boolean => t.id != todo.id))
    }
    return (
        <TodoContext.Provider value={{todos,doneTodos,addTodo,completeTodo,deleteTodo}}>{children}</TodoContext.Provider>
    )
} 


export const useTodo = () : ITodoContext => {
    const context = useContext(TodoContext)
    if(!context) {
        throw new Error(
            "useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다."  // context가 없는 경우에 대한 error 처리 
        )
    }
    return context // => 위 조건문을 거쳐 오기 때문에 무조건 context가 있는 경우가 되버림
}
