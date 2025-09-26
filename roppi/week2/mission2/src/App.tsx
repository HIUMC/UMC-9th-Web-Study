import React, { useState } from "react";
import type { Task } from "./types";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";
import { THEME, ThemeContext } from "./context/ThemeProvider";
import ThemeToggleButtons from "./components/ThemeToggleButtons";
import { useTheme } from "./context/ThemeProvider";
import clsx from 'clsx'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

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
    <div className={clsx(`p-4 w-full flex flex-col`,
      isLightMode ? 'bg-white' : 'bg-black'
     )}>
      <ThemeToggleButtons />
      <h1 className={clsx(`text-center`)}>YONG</h1>
      <TodoForm addTodo={addTodo} />

      <div className={clsx(`p-4 w-full flex gap-30 justify-center `)}>
        <TodoList todos={todos} onComplete={completeTask} />
        <DoneList doneTasks={doneTasks} onDelete={deleteTask} />
      </div>
    </div>
  );
};

export default App;
