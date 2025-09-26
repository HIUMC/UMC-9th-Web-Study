// 리스트 렌더링 재사용 컴포넌트
// 사용 이유 : 할 일 목록/ 완료 목록이 같은 UI패턴 사용

import type { TTodo } from "../types/todo";

// ** Props 타입 정의
interface TodoListProps {
  // 섹션 제목 ("할 일"/"완료")
  title: string; 
  // 출력할 todo배열 (없을 수도 있으니까 ?붙여줌)
  todos?: TTodo[];
  // 버튼에 표시될 텍스트 ("완료"/"삭제")
  buttonLabel: string;
  // 버튼 배경색
  buttonColor: string;
  // 버튼 눌렀을 때 실행할 함수
  onClick: (todo: TTodo) => void;
}

// ** Props 구조 분해 할당
// title, todos, buttonLabel, buttonColor, onClick을 바로 꺼내서 사용
const TodoList = ({title,todos,buttonLabel,buttonColor,onClick}:TodoListProps) => {
// ** 렌더링  
  // 1) todos?.map((todo) : 배열을 돌면서 <li> 생성
  // 2) onClick={() => onClick(todo)} : 부모로부터 전달받은 함수 실행
  return (
    <div className="render-container__section">
          <h2 className="render-container__title">{title}</h2>
          <ul id="todo-list" className="render-container__list">
            {todos?.map((todo) => (
              <li key={todo.id} className="render-container__item">
              <span className="render-container__item-text">{todo.text}</span>
              <button
               onClick={() => onClick(todo)}
               style={{backgroundColor: buttonColor}}
               className="render-container__item-button">{buttonLabel}</button>
            </li>
            ))}
          </ul>
        </div>
  )
}

export default TodoList