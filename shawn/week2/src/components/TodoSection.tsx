import type { Todo } from "../App";

type TodoSectionProps = {
  title: string;
  todos: Todo[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoSection({
  title,
  todos,
  onComplete,
  onDelete,
}: TodoSectionProps) {
  return (
    <section className="todo-section">
      <h2 className="todo-section__title">{title}</h2>
      <ul className="todo-section__list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <span className="todo-item__text">{todo.text}</span>
            {todo.isDone ? (
              <button
                className="todo-item__button todo-item__button--delete"
                onClick={() => onDelete(todo.id)}
              >
                삭제
              </button>
            ) : (
              <button
                className="todo-item__button todo-item__button--complete"
                onClick={() => onComplete(todo.id)}
              >
                완료
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
