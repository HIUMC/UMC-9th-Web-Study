import { useState } from "react";
import { useTodo } from "../context/TodoContext";

// ** 할일 입력 + 추가 기능을 하는 컴포넌트
const TodoForm = () => {
  // 입력창의 내용 관리
  const [input, setInput] = useState<string>('');
  // TodoContex에서 addTodo를 가져옴
  // 새로운 todo 항목을 전역상태 (todos에 추가)
  const {addTodo} = useTodo();

  // 할 일 추가 함수 (배열에 추가)
  // 이미 state에 저장돼 있는 값을 읽어서 새로운 todo를 배열에 추가
  // e : 이벤트 객체를 매개변수로 전달
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    // 내용이 있다면 addTodo 함수로 text 추가
    // addTodo함수에 setTodos((prevTodos) => [...prevTodos, newTodo]); 이부분 있음
    if (text) {
      addTodo(text);
      setInput('');
    }
  }
  
// ** 렌더링
  // 1) <form> : 폼 제출 시 handleSubmit 실행
  // 2) <input> : onChange={(e): void => setInput(e.target.value)} 
  //              -> 입력창 값을 항상 상태와 동기화 
  //              -> 사용자가 타이핑할 때마다 실행
  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  )
};

export default TodoForm;