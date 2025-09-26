import React from "react";
import type { Task } from "../types";
import TodoItem from "./TodoItem";

interface DoneListProps {
  doneTasks: Task[];
  onDelete: (task: Task) => void;
}

const DoneList: React.FC<DoneListProps> = ({ doneTasks, onDelete }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
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
