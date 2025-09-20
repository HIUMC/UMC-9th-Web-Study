import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [input, setInput] = useState<string>("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim(); // 123 123 -> 123123 => trim

    if (text) {
      addTodo(text);
      setInput(""); // 입력창을 빈 상태로 초기화
    }
  };
  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input} // 입력창에 표시될 값을 input 상태와 연결
        onChange={(e): void => setInput(e.target.value)} // 키보드를 입력할 때마다 setInput 함수 호출
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
