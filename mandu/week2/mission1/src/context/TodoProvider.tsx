import { createContext, useContext, useState, ReactNode } from 'react';
import { type TTodos } from '../types/todo';

// Context의 타입 정의
interface TodoContextType {
  todos: TTodos[];
  addTodos?: (todoText: string) => void;
  completeTodo?: (todoId: number) => void;
  deleteTodo?: (todoId: number) => void;
}

// Context 생성 (초기값은 undefined로 설정)
export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

// Context Provider 생성
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TTodos[]>([]);

  const addTodos = (todoText: string) => {
    const nextTodo: TTodos = {
      id: Date.now(),
      text: todoText,
      isDone: false
    };
    setTodos([...todos, nextTodo]);
  }

  const completeTodo = (todoId: number) =>{
      setTodos(todos.map((todo) =>
      todo.id === todoId ? {...todo, isDone:true}: todo));
    }
  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  return (
    <TodoContext.Provider
      value={{ todos, addTodos, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      'useTodo는 반드시 TodoProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};