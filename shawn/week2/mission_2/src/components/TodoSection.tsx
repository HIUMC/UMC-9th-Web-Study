import { useTodo } from "../context/TodoContext";

type TodoSectionProps = {
  title: string;
  isDone: boolean;
};

export default function TodoSection({ title, isDone }: TodoSectionProps) {
  const { todos, completeTodo, deleteTodo } = useTodo();

  const filtered = todos.filter((todo) => todo.isDone === isDone);

  return (
    <section className="flex-1">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <ul className="list-none p-0 m-0">
        {filtered.map((todo) => (
          <li
            key={todo.id}
            className="px-4 py-2 mb-2 rounded-lg flex justify-between items-center
              bg-gray-100 dark:bg-gray-700 transition-colors duration-300"
          >
            <span className="text-base text-gray-900 dark:text-gray-100">
              {todo.text}
            </span>
            {isDone ? (
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-3 py-1 rounded-md text-sm font-semibold cursor-pointer text-white
                  bg-red-600 hover:bg-red-700
                  dark:bg-red-700 dark:hover:bg-red-800 transition-colors duration-300"
              >
                삭제
              </button>
            ) : (
              <button
                onClick={() => completeTodo(todo.id)}
                className="px-3 py-1 rounded-md text-sm font-semibold cursor-pointer text-white
                  bg-green-500 hover:bg-green-600
                  dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300"
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
