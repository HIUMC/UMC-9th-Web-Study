import { useState } from "react"
import type {TTodo} from '../types/todo';
import type { FormEvent } from "react";


// 1. 상태 설계(할일, 한일, 입력값)
const Todo = () => {
  const [todos, setTodos] = useState<TTodo[]>([
    
  ]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([
    
  ]);
  // input은 “새로운 todo를 작성하기 전 임시 저장 공간"
  const [input, setInput] = useState<string>('');

  // 2. 상태를 바꾸는 로직(함수) 작성(이벤트 핸들러)
  // setter함수를 어떻게 호출할 지 정하는 함수들
  const handleSubmit = (e : FormEvent<HTMLFormElement>) :void => {
      e.preventDefault();
      console.log('동작함');
      const text = input.trim();

      if(text) {
        const newTodo : TTodo = {id: Date.now(), text:text};
        setTodos((prevTodos):TTodo[] => [...prevTodos,newTodo]);
      }
      setInput(''); // 상태를 공백으로 만들어주면 입력칸도 공백이 된다! 
  }

  const completeTodo = (todo:TTodo):void => {
    setTodos(prevTodos => prevTodos.filter((t) => t.id !== todo.id))
    // 배열.filter((요소, 인덱스, 배열자체) => 조건식)
    // 조건식: true/false 반환하는 표현식
    // true → 그 요소를 새 배열에 포함, false → 새 배열에서 제외
    setDoneTodos((prevDoneTodos):TTodo[] => [...prevDoneTodos,todo]);
  }

  const deleteTodo= (todo:TTodo):void => {
    setDoneTodos((prevDoneTodos):TTodo[] => prevDoneTodos.filter((t) => t.id !== todo.id));
  }

  return (
    <div className='todo-container'>
      <h1 className='todo-container__header'>KHAKI TODO</h1>
      <form onSubmit={handleSubmit} className="todo-container__form">
      {/* onSubmit={handleSubmit} → 사용자가 Enter 키를 치거나 버튼(type="submit")을 클릭했을 때 handleSubmit 실행.*/}  
        <input
          value={input}
          onChange={(e):void => setInput(e.target.value)}
          // 처음 렌더링: value={input} → input 태그의 값은 input state 값과 같음.
          // 글자를 치면 onChange 이벤트 발생.이벤트 핸들러 setInput(e.target.value) 실행 → 상태 input 업데이트.
          // 상태가 바뀌면 컴포넌트가 다시 렌더링됨. value={input}이 다시 적용 → input 태그 안에 새로운 input 값이 반영됨.
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
        />
        <button type="submit" className="todo-container__button">할 일 추가</button>
      </form>
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {
              // 3. 상태기반으로 렌더링
              todos.map((todo) => (
                
                // key는 리액트가 리스트를 렌더링할 때 각 요소를 구별하기 위한 고유 식별자(map을 사용한다면 필수!)
                <li key={todo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {todo.text}
                  </span>
                  <button style={
                    {backgroundColor: '#28a745'}}
                    className="render-container__item-button"
                    onClick= {():void => completeTodo(todo)}
                    // onClick = {...} : onClick버튼 클릭시 실행할 함수를 넣음
                    // 렌더링할 때 실행되지 않고, 버튼이 클릭될 때 실행하기 위해 저런식으로 작성
                  >완료</button>
                </li>
              ))
              
            }
          </ul>
        </div>

        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="todo-list" className="render-container__list">
             {
              doneTodos.map((doneTodo) => (
                // key는 리액트가 리스트를 렌더링할 때 각 요소를 구별하기 위한 고유 식별자(map을 사용한다면 필수!)
                <li key={doneTodo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {doneTodo.text}
                  </span>
                  <button 
                  style={{backgroundColor: '#dc3545'}}
                  className="render-container__item-button"
                  onClick={():void => deleteTodo(doneTodo)}>
                    삭제
                    </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Todo
