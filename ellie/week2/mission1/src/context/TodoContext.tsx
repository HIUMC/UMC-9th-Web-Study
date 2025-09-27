// 상태 전역 관리 (할일 추가 , 완료 함수, 삭제 함수)

import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { TTodo } from "../types/todo";

// ** Context에서 공유할 데이터 타입 정의
interface ITodoContext {
  // 아직 완료되지 않은 할 일 목록
  todos?: TTodo[];
  // 완료된 할 일 목록
  doneTodos: TTodo[];
  // 새 할 일을 추가하는 함수 
  // TodoList에서 사용
  addTodo: (text: string) => void;
  // 완료 처리하는 함수
  // TodoList에서 사용
  completeTodo: (todo: TTodo) => void;
  // 삭제 처리하는 함수
  // TodoList에서 사용
  deleteTodo: (todo: TTodo) => void;
}

// ** Context 객체 생성
// 초기값은 undefined -> Provider로 감싸지 않고 쓰면 에러남
export const TodoContext = createContext<ITodoContext | undefined>(undefined);

// ** Provider 컴포넌트
//    : 전역에서 관리할 상태 (todos,doneTodos)
//    -> input은 TodoForm에서 관리
export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  // 1) 할 일 추가
  const addTodo = (text: string): void => {
    // 객체 생성
    const newTodo: TTodo = { id: Date.now(), text };
    // 이전 배열에 객체 추가후 새배열로 반환
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // 2) 완료 처리
  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  // 3) 삭제 처리
  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevDoneTodos) =>
      prevDoneTodos.filter((t) => t.id !== todo.id)
    );
  };

  // 4) Context값 제공
  // :value 안에 todos, doneTodos, addTodo, completeTodo, deleteTodo를 
  // 담아서 하위 컴포넌트에 전달
  // -> useTodo()만 호출하면 이 값들 사용 o
  // 컴포넌트 안의 정의된 부분(title, onClick...)을 한 번에 넘겨줄 수 있음 Children으로 감쌈 ..
  return (
    <TodoContext.Provider
      value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}
    >
      {children} 
    </TodoContext.Provider>
  );
};

// ** 커스텀 훅
export const useTodo = ():ITodoContext => {
  // Context에서 제공하는 값 불러오기
  const context = useContext(TodoContext);
  // 만약 TodoProvider로 감싸지 않은 곳에서 호출하면 -> 에러 던짐
  if (!context) {
    throw new Error(
      "useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다."
    );
  }
  return context;
}