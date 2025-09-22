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

/* 
2. Context 생성 (초기값은 undefined → Provider로 감싸기 전엔 값 없음)
    - Provider로 감싸지 않아도 useContext() 호출은 가능하다. 다만 그때 반환값은 우리가 넣어둔 초기값인 undefined가 되는 것!
    - 감싸져 있을때는, Provider를 통해 트리 아래로 "value"를 방송한다. 그러면 useContext는 가장 가까운 Provider가 방송한 "value"를 즉시 읽어온다.
*/
export const TodoContext = createContext<ITodoContext | undefined>(undefined);


// 3. Provider 컴포넌트 정의

// 3-1. Provider 컴포넌트의 뼈대
// {children}:PropsWithChildren : 이 컴포넌트가 자식 컴포넌트(<Todo/>)를 받는다는 뜻, 트리를 감싸기 위함
export const TodoProvider = ({children}:PropsWithChildren): React.
ReactElement=> 
  {
  // 3-2. 전역으로 공유할 상태, 함수 만들기
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  // 할 일을 입력했을 떄 todos의 상태 업데이트 함수
  const addTodo = (text:string):void=>{
    const newTodo : TTodo = {id: Date.now(), text:text};
    setTodos((prevTodos):TTodo[] => [...prevTodos,newTodo]);
  };
  // 할일을 완료했을 때 doneTodos와 todos 상태 업데이트 함수
  const completeTodo = (todo:TTodo):void => {
    setTodos(prevTodos => prevTodos.filter((t) => t.id !== todo.id))
    /* 배열.filter((요소, 인덱스, 배열자체) => 조건식)
      조건식: true/false 반환하는 표현식
       true → 그 요소를 새 배열에 포함, false → 새 배열에서 제외 */
    setDoneTodos((prevDoneTodos):TTodo[] => [...prevDoneTodos,todo]);
  };
  // 삭제할 때 doneTodos 상태 업데이트 함수
  const deleteTodo= (todo:TTodo):void => {
    setDoneTodos((prevDoneTodos):TTodo[] => prevDoneTodos.filter((t) => t.id !== todo.id));
  };

  // 3-3. context를 방송하고 children을 끼워넣는 부분
  // <TodoContext.Provider> : Provider는 트리 아래쪽 컴포넌트들에게 context값을 전달(브로드캐스트)하는 컴포넌트이다. 이 안에서 렌더되는 모든 자식은 useContext(TodoContext) 값을 읽을 수 있다.
  return(
    <TodoContext.Provider value={
      {todos, doneTodos, addTodo, completeTodo, deleteTodo}
      // context로 내려줄 단 하나의 객체를 준다. 타입은 ITodoContext이다.
      }>
      {children /*컨텍스트를 공급하면서 그 “감싼 트리(children)”를 이 자리에서 출력*/} 
    </TodoContext.Provider>
  )

};


// 4. context 전용 커스텀 훅

/* 왜 사용?
  - 매번 useContext를 쓰면 undefined를 체크해야되는데 이러한 수고를 없앤다.
  - 일관된 에러 메시지/가드를 보내줄 수 있다 */
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



// 실제 동작 흐름 요약
/*
1. Provider가 value를 만들어 트리 아래에 방송
2. 하위 컴포넌트가 useTodo()로 가장 가까운 Provider의 value를 읽음
3. addTodo/completeTodo/deleteTodo가 setState 실행 → 상태 배열이 새 참조로 바뀜
4. Provider가 재렌더 → value 참조도 바뀜 → Consumer들이 자동으로 재렌더링
*/