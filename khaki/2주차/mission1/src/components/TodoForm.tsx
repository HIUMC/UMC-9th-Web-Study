import { useState, type FormEvent } from "react";
import  {useTodo}  from "../context/TodoContext";


const TodoForm = () => {
  const {addTodo} = useTodo();  //구조분해 할당
  const [input, setInput] = useState<string>('');
  const handleSubmit = (e : FormEvent<HTMLFormElement>) :void => {
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
        <input
          value={input}
          onChange={(e):void => setInput(e.target.value)}
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
        />
        <button type="submit" className="todo-container__button">할 일 추가</button>
      </form>
    </div>
  )
}

export default TodoForm;
