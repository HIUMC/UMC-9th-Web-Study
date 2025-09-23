import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function TodoForm() {
  const [value, setValue] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-8 gap-2">
      <input
        type="text"
        value={value}
        placeholder="할 일 입력"
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg text-base outline-none
          focus:border-green-500 transition-colors duration-300
          bg-white text-gray-900 border-gray-300 placeholder:text-gray-400
          dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder:text-gray-300"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer text-white
          bg-green-500 hover:bg-green-600
          dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300"
      >
        할 일 추가
      </button>
    </form>
  );
}
