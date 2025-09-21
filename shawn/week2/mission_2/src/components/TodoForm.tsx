import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { useTheme } from "../context/ThemeContext";

export default function TodoForm() {
  const [value, setValue] = useState("");
  const { addTodo } = useTodo();
  const { darkMode } = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      addTodo(trimmed);
      setValue("");
    }
  };

  return (
    <form className="flex justify-center mb-8 gap-2" onSubmit={handleSubmit}>
      <input
        className={`flex-1 px-4 py-2 border rounded-lg text-base outline-none
          focus:border-green-500 
          ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder:text-gray-300"
              : "bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
          }`}
        type="text"
        placeholder="할 일 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer text-white
          ${
            darkMode
              ? "bg-green-600 hover:bg-green-700"
              : "bg-green-500 hover:bg-green-600"
          }`}
        type="submit"
      >
        할 일 추가
      </button>
    </form>
  );
}
