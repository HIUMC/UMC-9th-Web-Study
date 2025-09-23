import { useState, type FormEvent } from "react";
import type { TTodo } from "../types/todo";

const TodoBefore = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    const text = input.trim(); // 문자열 앞뒤 공백 없앰

    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prevTodos) => [...prevTodos, newTodo]); // 이전 값 뒤에 붙이기
      setInput(""); // input 값을 공백으로
    }
  };

  const completeTodo = (todo: TTodo) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id)); // 지금 완료하려는 todo와 id가 다른 것만 남김
    // filter에서 t를 남김
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo) => {
    setDoneTodos((prevDoneTodo) =>
      prevDoneTodo.filter((t) => t.id !== todo.id)
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">POCHAE TODO</h1>
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
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todos.map(
              (
                todo // map 돌리면서 하나하나 순회하겠다. todo는 단수로
              ) => (
                <li key={todo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {todo.text}
                  </span>
                  <button
                    onClick={() => completeTodo(todo)}
                    style={{
                      backgroundColor: "#28a745",
                    }}
                    className="render-container__item-button"
                  >
                    완료
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="todo-list" className="render-container__list">
            {doneTodos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo)}
                  style={{
                    backgroundColor: "#dc3545",
                  }}
                  className="render-container__item-button"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoBefore;
