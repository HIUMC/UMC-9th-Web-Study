import { useState, type FormEvent } from "react";
// type FormEvent : form에서 submit같은 이벤트가 발생했을 때 해당 객체 타입 명시에 사용
import type { TTodo } from "../types/todo";
// 할일 객체의 구조를 정의하는 타입 선언

const TodoBefore = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  // state : 할일 관리, 완료 관리, 입력 관리
  // todos : 할일, doneTodos : 완료, input : 입력

  console.log("Input", input);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // 폼을 제출할 때 페이지 새로고침을 막는 기능 / 싱글 페이지 애플리케이션에서 필수적
    console.log("동작함");
    const text = input.trim(); // 123 123 -> 123123 => trim

    if (text) {
      // 공백만 있는 할일을 방지
      const newTodo: TTodo = { id: Date.now(), text }; // 새로운 할일 선언(id는 지금 시각, text는 할일내용)
      setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]); // 할일이 들어오면 이전값인 prevTodos와 같이 렌더링
      setInput(""); // 입력창을 빈 상태로 초기화
    }
  };

  const completeTodo = (todo: TTodo): void => {
    // TTodo 타입의 todo에 대해서
    setTodos((prevTodos): TTodo[] =>
      prevTodos.filter((t): boolean => t.id !== todo.id)
    ); // 전달된 todo의 id와 다른 요소들만 렌더링
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]); // 전달된 todo는 doneTodos로 넘김
  };

  const deleteTodo = (todo: TTodo): void => {
    // TTodo 타입의 todo에 대해서
    setDoneTodos((prevDoneTodos): TTodo[] =>
      prevDoneTodos.filter((t): boolean => t.id !== todo.id)
    ); // 전달된 todo의 id와 다른 요소들만 렌더링 -> 그러면 진짜 지워진건 아닌가?
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <form onSubmit={handleSubmit} className="todo-container__form">
        {" "}
        {/*Enter를 누르거나 할일 추가버튼을 클릭하면 handleSubmit 함수가 실행*/}
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
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todos.map(
              (
                todo // todos 배열을 순회하며 각 항목에 대한 <li> 태그 생성
              ) => (
                <li key={todo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {todo.text}
                  </span>
                  <button
                    onClick={(): void => completeTodo(todo)}
                    style={{ backgroundColor: "#28a745" }}
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
                  onClick={(): void => deleteTodo(todo)}
                  style={{ backgroundColor: "#dc3545" }}
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
