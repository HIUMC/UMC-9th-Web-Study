import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { TTodo } from "../types/todo";

interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text: string): void => {
    const newTodo: TTodo = { id: Date.now(), text };
    setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
  };

  const completeTodo = (todo: TTodo): void => {
    // TTodo 타입의 todo에 대해서
    setTodos((prevTodos): TTodo[] =>
      prevTodos.filter((t): boolean => t.id !== todo.id)
    ); // 전달된 todo의 id와 다른 요소들만 렌더링
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]); // 전달된 todo는 doneTodos로 넘김
  };

  const deleteTodo = (todo: TTodo): void => {
    // TTodo 타입의 todo에 대해서
    setDoneTodos((prevDoneTodos): TTodo[] =>
      prevDoneTodos.filter((t): boolean => t.id !== todo.id)
    ); // 전달된 todo의 id와 다른 요소들만 렌더링 -> 그러면 진짜 지워진건 아닌가?
  };

  return (
    <TodoContext.Provider
      value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): ITodoContext => {
  const context = useContext(TodoContext);
  // 컨텍스트가 없는 경우
  if (!context) {
    throw new Error(
      "useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다."
    );
  }
  // 컨텍스트가 있는 경우
  return context;
};
