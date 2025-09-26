import React from "react";
import type { Task } from "../types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Task[];
  onComplete: (task: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
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
