import React from "react";
import type { Task } from "../types";
import TodoItem from "./TodoItem";
import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from 'clsx'

interface DoneListProps {
  doneTasks: Task[];
  onDelete: (task: Task) => void;
}

const DoneList: React.FC<DoneListProps> = ({ doneTasks, onDelete }) => {
  const {theme, toggleTheme} = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className="render-container__section">
      <h2 className={clsx(        isLightMode ? "text-black" : "text-white"
)}>완료</h2>
      <ul className="render-container__list">
        {doneTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            isDone={true}
            onAction={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default DoneList;
