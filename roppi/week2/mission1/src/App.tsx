import React, { useState } from "react";
import type { Task } from "./types";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  // 할 일 추가
  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  // 완료 처리
  const completeTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  // 삭제 처리
  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <TodoForm addTodo={addTodo} />

      <div className="render-container">
        <TodoList todos={todos} onComplete={completeTask} />
        <DoneList doneTasks={doneTasks} onDelete={deleteTask} />
      </div>
    </div>
  );
};

export default App;
