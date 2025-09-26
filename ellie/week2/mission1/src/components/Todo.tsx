// 메인화면 컴포넌트

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useTodo } from '../context/TodoContext';

const Todo = () => {
// useTodo()는 TodoContext에서 제공한 값들을 불러오는 역할
// 이제 이 컴포넌트 안에서 todos와 doneTodos 상태를 직접 관리할 필요 없음
// Context가 전역에서 관리해줌
  const {todos,doneTodos,completeTodo,deleteTodo} = useTodo();

// 1) TodoForm : 새로운 할 일을 입력/추가 하는 컴포넌트
//  - 내부에서 addTodo 사용
// 2) TodoList : 할 일 목록/완료목록
//    (title->제목, todos->데이터, buttonLabel/buttonColor->버튼, onClick->동작)
  return (
    <div className="todo-container">
      <h1 className="todo-container__header"></h1>
      <TodoForm />
        <div className="render-container">
          <TodoList 
            title="할 일" 
            todos={todos} 
            buttonLabel="완료"
            buttonColor='#28a745'
            onClick={completeTodo}
          />
          <TodoList 
            title="완료" 
            todos={doneTodos}
            buttonLabel="삭제"
            buttonColor='#dc3545'
            onClick={deleteTodo} 
          />
        </div>

    </div>
  )
};
export default Todo;

