import React, { useState } from "react";
import clsx from "clsx";
import { useTheme, THEME } from "../context/ThemeProvider";

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [input, setInput] = useState("");
    const { theme, toggleTheme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(`flex justify-center gap-10`, 
    )}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={clsx( isLightMode ? "text-black placeholder-gray-500"
      : "text-white placeholder-gray-300")}
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className={clsx(`border-2 border-gray-400 rounded-sm p-2`,
        isLightMode ? "text-black" : "text-white"
      )}>
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
