import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [input, setInput] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    const text = input.trim(); // 문자열 앞뒤 공백 없앰

    if (text) {
      // addTodo
      addTodo(text);
      setInput(""); // input 값을 공백으로
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
