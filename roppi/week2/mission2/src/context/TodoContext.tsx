import React, { createContext, useState } from "react";
import type { Task, TodoContextType } from "../types";

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTodo = (text: string) => setTodos(prev => [...prev, { id: Date.now(), text }]);
  const completeTask = (task: Task) => {
    setTodos(prev => prev.filter(t => t.id !== task.id));
    setDoneTasks(prev => [...prev, task]);
  };
  const deleteTask = (task: Task) => setDoneTasks(prev => prev.filter(t => t.id !== task.id));

  return (
    <TodoContext.Provider value={{ todos, doneTasks, addTodo, completeTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  );
};
