import { useState, type FormEvent } from "react";
import  {useTodo}  from "../context/TodoContext";


const TodoForm = () => {
  const {addTodo} = useTodo();  
  //구조분해 할당으로 addTodo함수 가져옴 
  const [input, setInput] = useState<string>('');
  // input은 전역공유가 필요없는 컴포넌트 내부에서만 쓰이는 상태라서 useContext를 굳이 안 씀
  // 이렇게 useState로 상태릃 만들면 해당 컴포넌트에선 자유롭게 읽고 바꿀수 있음
  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        // onSubmit에 연결된 함수는 React.FormEvent<HTMLFormElement> 타입의 이벤트 객체를 받는다.
        e.preventDefault();
        console.log('동작함');
        const text = input.trim();
  
        if(text) 
          {addTodo(text)}
        setInput(''); // 상태를 공백으로 만들어주면 입력칸도 공백이 된다! 
   }


  return (
    <div>
      <form onSubmit={handleSubmit} className="todo-container__form"> 
      {/* form태그의 onSubmit : 폼이 제출될 때 실행할 이벤트 핸들러를 지정 (이때 제출조건은 enter키를 누르거나 <button type="submit">이 눌릴 때*/}
        <input
          // “내가 입력 → 상태 변경 → 리렌더링 → 상태가 다시 입력창에 그려짐”
          value={input}
          // value속성 : 그 입력창에 실제로 보이는 값
          // 따라서 아래 onChange에 따라 상태가 바뀌고 상태가 value에 들어옴
          onChange={(e)=> setInput(e.target.value)}
          // 사용자가 키보드를 칠 때마다 이벤트 발생
          // e.target.value -> 입력창의 현재 문자열 값
          // setInput으로 상태를 갱신
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          required  // 값이 비어 있을 때 폼을 제출하려고 하면 브라우저가 자동으로 제출을 막고 경고를 띄운다. 필수 입력값!
        />
        <button type="submit" className="todo-container__button">할 일 추가</button>
      </form>
    </div>
  )
}

export default TodoForm;
