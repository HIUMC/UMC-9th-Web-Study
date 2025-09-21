import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { TTodo } from "../types/todo";


// 1. Context가 담을 값(상태,함수) 의 타입 정의
interface ITodoContext{
  todos:TTodo[];
  doneTodos:TTodo[];
  addTodo:(text:string) => void;
  completeTodo:(todo:TTodo)=>void;
  deleteTodo:(todo:TTodo)=>void;
}

// 2. Context 생성 (초기값은 undefined → Provider로 감싸기 전엔 값 없음)
export const TodoContext = createContext<ITodoContext | undefined>(undefined);


// 3. Provider 컴포넌트 정의
export const TodoProvider = ({children}:PropsWithChildren): React.ReactElement=> {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text:string):void=>{
    const newTodo : TTodo = {id: Date.now(), text:text};
    setTodos((prevTodos):TTodo[] => [...prevTodos,newTodo]);
  };

  const completeTodo = (todo:TTodo):void => {
    setTodos(prevTodos => prevTodos.filter((t) => t.id !== todo.id))
    // 배열.filter((요소, 인덱스, 배열자체) => 조건식)
    // 조건식: true/false 반환하는 표현식
    // true → 그 요소를 새 배열에 포함, false → 새 배열에서 제외
    setDoneTodos((prevDoneTodos):TTodo[] => [...prevDoneTodos,todo]);
  };
  const deleteTodo= (todo:TTodo):void => {
    setDoneTodos((prevDoneTodos):TTodo[] => prevDoneTodos.filter((t) => t.id !== todo.id));
  };

  return(
    <TodoContext.Provider value={{todos, doneTodos, addTodo, completeTodo, deleteTodo}}>
      {children}
    </TodoContext.Provider>
  )

};


// undefined나 null인 경우를 생각하여 그거에 대한 처리를 해주는 것(매우 중요)
export const useTodo = ():ITodoContext => {
  const context = useContext(TodoContext);
  
  // context없는 경우(우산 밖에 있는 컴포넌트)
  if(!context)
  { throw new Error(
      'useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.'
  );}

  //context있는 경우(우산 안에 있는 컴포넌트)
  return context
}