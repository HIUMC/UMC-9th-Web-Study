import type { TTodo } from "../types/todo";

interface TodoListProps {
  title:string;
  todos : TTodo[];
  buttonLabel : string;
  buttonColor: string;
  onClick : (todo:TTodo) => void;
}

const TodoList = ({
  title, 
  todos, 
  buttonLabel,
  buttonColor,
  onClick
}:TodoListProps) => {
  return (
    <div className="render-container__section">
          <h2 className="render-container__title">{title}</h2>
          <ul id="todo-list" className="render-container__list">
            {
              // 3. 상태기반으로 렌더링
              todos.map((todo):any => (
                
                // key는 리액트가 리스트를 렌더링할 때 각 요소를 구별하기 위한 고유 식별자(map을 사용한다면 필수!)
                <li key={todo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {todo.text}
                  </span>
                  <button style={
                    {backgroundColor:buttonColor}}
                    className="render-container__item-button"
                    onClick= {():void => onClick(todo)}
                    // onClick = {...} : onClick버튼 클릭시 실행할 함수를 넣음
                    // 렌더링할 때 실행되지 않고, 버튼이 클릭될 때 실행하기 위해 저런식으로 작성
                  >{buttonLabel}</button>
                </li>
              ))
              
            }
          </ul>
        </div>
  )
}

export default TodoList
