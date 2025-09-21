import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
 


const Todo = () => {
  const {todos,completeTodo,deleteTodo,doneTodos} = useTodo();

  return(
    <div className='todo-container'>
      <h1 className='todo-container__header'>KHAKI TODO</h1>
      <TodoForm/>
      <div className="render-container">
        <TodoList 
        //여기서 props들의 이름은 딱히 정해진 속성같은게 아니라 그냥 내가 지어준 이름
          title="할 일"
          todos = {todos} 
          //옵셔널 체이닝 : ?.앞의 값이 없을 때 에러가 내지 않고 undefined를 반환
          buttonLabel ="완료"
          buttonColor = '#28a745'
          onClick={completeTodo}  
        />
        <TodoList
          title="완료"
          todos = {doneTodos}
          buttonLabel ="삭제"
          buttonColor = '#dc3545'
          onClick={deleteTodo}  
        />
      </div>
    </div>
    
  );
};

export default Todo;