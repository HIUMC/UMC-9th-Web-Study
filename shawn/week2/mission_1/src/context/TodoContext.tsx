import { createContext, useContext, useState, type ReactNode } from "react";

export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, isDone: false }]);
  };

  const completeTodo = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, completeTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used whithin TodoProvider");
  }

  return context;
}
