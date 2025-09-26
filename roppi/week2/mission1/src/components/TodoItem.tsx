import React from "react";
import type { Task } from "../types";

interface TodoItemProps {
  task: Task;
  isDone: boolean;
  onAction: (task: Task) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, isDone, onAction }) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button
        className="render-container__item-button"
        onClick={() => onAction(task)}
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
};

export default TodoItem;
