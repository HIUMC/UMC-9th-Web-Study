import React from "react";
import type { Task } from "../types";
import TodoItem from "./TodoItem";
import clsx from "clsx";
import { useTheme, THEME } from "../context/ThemeProvider";

interface TodoListProps {
  todos: Task[];
  onComplete: (task: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete }) => {
    const {theme, toggleTheme} = useTheme();
    const isLightMode = theme === THEME.LIGHT;
  
  
  return (
    <div className="render-container__section">
    <h2 className={clsx(        isLightMode ? "text-black" : "text-white"
       )}>할일</h2>      
        <ul className="render-container__list">
        {todos.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            isDone={false}
            onAction={onComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
