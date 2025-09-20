import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoSection from "./components/TodoSection";

//TypeScript + React로 TodoList 구현
export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

export default function App() {
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
    <div className="todo-app">
      <h1 className="todo-app__title">Shawn Todo</h1>
      <TodoForm onAdd={addTodo} />

      <div className="todo-app__section">
        <TodoSection
          title="할일"
          todos={todos.filter((t) => !t.isDone)}
          onComplete={completeTodo}
          onDelete={deleteTodo}
        />
        <TodoSection
          title="완료"
          todos={todos.filter((t) => t.isDone)}
          onComplete={completeTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}
