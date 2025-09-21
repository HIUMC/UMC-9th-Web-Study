import { useTodo } from "../context/TodoContext";
import { useTheme } from "../context/ThemeContext";

type TodoSectionProps = {
  title: string;
  isDone: boolean;
};

export default function TodoSection({ title, isDone }: TodoSectionProps) {
  const { todos, completeTodo, deleteTodo } = useTodo();
  const { darkMode } = useTheme();

  const filtered = todos.filter((todo) => todo.isDone === isDone);

  return (
    <section className="flex-1">
      <h2
        className={`text-lg font-bold mb-4 ${
          darkMode ? "text-gray-100 " : "text-gray-900 bg-transparent"
        }`}
      >
        {title}
      </h2>
      <ul className="list-none p-0 m-0">
        {filtered.map((todo) => (
          <li
            key={todo.id}
            className={`px-4 py-2 mb-2 rounded-lg flex justify-between items-center ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <span
              className={`text-base ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {todo.text}
            </span>
            {todo.isDone ? (
              <button
                className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer 
                  ${
                    darkMode
                      ? "bg-red-700 hover:bg-red-800"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white`}
                onClick={() => deleteTodo(todo.id)}
              >
                삭제
              </button>
            ) : (
              <button
                className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer 
                  ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
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
