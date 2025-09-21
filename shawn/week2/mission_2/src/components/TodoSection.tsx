import { useTodo } from "../context/TodoContext";

type TodoSectionProps = {
  title: string;
  isDone: boolean;
};

export default function TodoSection({ title, isDone }: TodoSectionProps) {
  const { todos, completeTodo, deleteTodo } = useTodo();

  const filtered = todos.filter((todo) => todo.isDone === isDone);
  return (
    <section className="todo-section">
      <h2 className="todo-section__title">{title}</h2>
      <ul className="todo-section__list">
        {filtered.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <span className="todo-item__text">{todo.text}</span>
            {todo.isDone ? (
              <button
                className="todo-item__button todo-item__button--delete"
                onClick={() => deleteTodo(todo.id)}
              >
                삭제
              </button>
            ) : (
              <button
                className="todo-item__button todo-item__button--complete"
                onClick={() => completeTodo(todo.id)}
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
