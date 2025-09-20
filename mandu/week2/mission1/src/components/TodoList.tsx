import {type TTodos} from '../types/todo';
import { useTodo } from '../context/TodoProvider';



const TodoList = () =>{
  const {todos, completeTodo, deleteTodo} = useTodo();
    const todoLists = todos.filter((todos) => !todos.isDone);
    const doneLists = todos.filter((todos) => todos.isDone);

    return(
        <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todoLists.map((todo) => (
            <li key={todo.id}>{todo.text} <button onClick={() => completeTodo(todo.id)}>완료</button></li>
          ))}
          </ul>
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list">
            {doneLists.map((todo) => (
            <li key={todo.id}>{todo.text} <button onClick={() => deleteTodo(todo.id)}>삭제</button></li>
          ))}
          </ul>
        </div>
        </div>
    )
}

export default TodoList;