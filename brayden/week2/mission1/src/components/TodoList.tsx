import type { TTodo } from "../types/todo";

interface TodoListProps {
  title: string;
  todos?: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
}

const TodoList = ({
  title,
  todos,
  buttonLabel,
  buttonColor,
  onClick,
}: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id="todo-list" className="render-container__list">
        {todos?.map(
          (
            todo // todos 배열을 순회하며 각 항목에 대한 <li> 태그 생성
          ) => (
            <li key={todo.id} className="render-container__item">
              <span className="render-container__item-text">{todo.text}</span>
              <button
                onClick={(): void => onClick(todo)}
                style={{ backgroundColor: buttonColor }}
                className="render-container__item-button"
              >
                {buttonLabel}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TodoList;
