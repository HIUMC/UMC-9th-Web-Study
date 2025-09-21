// context 도입 전 버전 

import { useState } from 'react';
import type { TTodo } from '../types/todo.ts'; // 타입전용 import를 구분해야함

const TodoBefore = () => {
// ** 상태 정의
  // 아직 완료되지 않은 할 일 목록 배열
  const [todos,setTodos]=useState<TTodo[]>([]) 
  // 완료된 할 일 목록 배열
  const [doneTodos,setDoneTodos]=useState<TTodo[]>([])
  // 입력창에 사용자가 입력하는 문자열 
  const [input,setInput]=useState<string>('')

// ** 버튼 눌렀을 때 동작하는 함수들 
// : button요소의 onClick과 연결해서 호출해줌

// 할 일 추가 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
    // 새로 고침 막음
    e.preventDefault(); 
    // 양쪽 공백 제거
    const text = input.trim();
    // 새로운 할일 생성 후 이전 배열에 새 항목 이어붙임 -> 새로운 배열 생성
    if(text) {
      // 1) 새 객체 생성
      const newTodo:TTodo = {id:Date.now(),text}; 
      // 2) 새 항목 이어붙임
      setTodos((prevTodos) : TTodo[] => [...prevTodos, newTodo]); 
      setInput('');
    }
  }

// 할 일을 완료 목록으로 이동
  const completeTodo = (todo: TTodo) : void => {
    // 1) 할 일 목록에서 클릭된 todo 제거 (todos배열 변경)
    // filter(...)
    // : prevTodos 배열 안의 요소들을 하나씩 t에 대입해서 검사
    //   조건 => 클릭된 todo와 id가 같지 않은 것들만 남겨라
    //   결과 => 클릭된 todo만 제거된 새로운 배열이 반환
    setTodos((prevTodos) : TTodo[] => prevTodos.filter((t) : boolean => t.id !== todo.id));
    // 2) doneTodo에는 해당 todo 추가 (할 일 추가한 것처럼 쓰면 됨)
    // doneTodos 배열 변경
    setDoneTodos((prevDoneTodos) : TTodo[] => [...prevDoneTodos, todo]);
  };
  
// 완료 항목 삭제 
  const deleteTodo = (todo: TTodo) : void => {
    // 완료 목록에서 클릭한 todo를 제거한 새로운 배열 반환
    // 클릭된 todo만 제거된 새로운 배열이 반환
    setDoneTodos((prevDoneTodo) : TTodo[] => 
      prevDoneTodo.filter((t):boolean => t.id !== todo.id)
    );
  }

// ** UI 렌더링
// 1) 폼요소
//  - <form> : onSubmit시 handleSubmit 함수와 연결
//  - <input> : value -> 입력창에 표시되는 실제 값 , 
//              onChange 이벤트 -> 사용자가 입력한 텍스트 값을 React state에 반영
//  - <button> : 버튼 자체에 onClick을 달지 않아도 <form>의 onSubmit 이벤트 자동으로 실행
// 2) 할일 목록
//  - todos.map(...) : todos 배열을 돌면서 각 항목(todo)을 <li>태그로 변환
//  - <li> : key={todo.id}로 리액트가 각 아이템을 고유하게 구분할 수 있도록
//  - <span> : {todo.text} => 할 일의 내용 표시
//  - <button> : 클릭하면 completeTodo(todo)/deleteDoneTodo(dondTodo) 실행
  return ( 
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <form onSubmit={handleSubmit} className="todo-container__form">
        <input
          value={input}
          onChange={(e) : void => setInput(e.target.value)}
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
            {todos.map((todo) => (
              <li key={todo.id} className="render-container__item">
              <span className="render-container__item-text">{todo.text}</span>
              <button
               onClick={() => completeTodo(todo)}
               style={{backgroundColor:'#28a745'}}
               className="render-container__item-button">완료</button>
            </li>
            ))}
          </ul>
        </div>
       <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="todo-list" className="render-container__list">
           {doneTodos.map((doneTodo) => (
              <li key={doneTodo.id} className="render-container__item">
              <span className="render-container__item-text">{doneTodo.text}</span>
              <button
               onClick={() => deleteTodo(doneTodo)}
               style={{backgroundColor:'#dc3545'}}
               className="render-container__item-button">삭제</button>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default TodoBefore;