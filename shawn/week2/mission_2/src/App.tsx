import TodoForm from "./components/TodoForm";
import TodoSection from "./components/TodoSection";
import { TodoProvider } from "./context/TodoContext";

//TypeScript + React로 TodoList 구현
export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

export default function App() {
  return (
    <TodoProvider>
      <div className="todo-app">
        <h1 className="todo-app__title">Shawn Todo</h1>
        <TodoForm />

        <div className="todo-app__section">
          <TodoSection title="할일" isDone={false} />
          <TodoSection title="완료" isDone={true} />
        </div>
      </div>
    </TodoProvider>
  );
}
