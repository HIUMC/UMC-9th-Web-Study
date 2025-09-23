import React from "react";
import type { Task } from "../types";
import { useTheme, THEME } from "../context/ThemeProvider";
import clsx from "clsx"

interface TodoItemProps {
  task: Task;
  isDone: boolean;
  onAction: (task: Task) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, isDone, onAction }) => {
      const {theme, toggleTheme} = useTheme();
      const isLightMode = theme === THEME.LIGHT;
    
  
  return (
    <li className={clsx(`flex gap-10`)}>
      <span className={clsx( isLightMode ? 'text-black' : 'text-white')}>{task.text}</span>
      <button
        className={clsx( isLightMode ? 'text-black' : 'text-white')}
        onClick={() => onAction(task)}
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
};

export default TodoItem;
