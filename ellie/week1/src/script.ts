// 1. HTML 요소 선택 (핸드북 자바스크립트 편 참고)
// id로 입력창, 폼, 할 일 목록, 완료된 목록을 가져옴 -> getElementById 사용
// as HTMLInputElement 자바스크립트가 요소 타입임을 알 수 있도록 함
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일이 어떻게 생긴 애인지 Type을 정의
// id : 고유 번호 , text : string
type Todo = {
  id: number;
  text: string;
}

// - 할 일 저장용 배열
let todos: Todo[] = []; // 아직 완료하지 않은 할 일들
let doneTasks: Todo[] =[]; // 완료된 할 일들

// - 할 일 목록 렌더링 하는 함수 정의
const renderTasks = (): void => {
  //todoList와 doneList 비워줌 (기존에 있던 li도 비우고 다시 배열 돌면서 넣는건가)
  todoList.innerHTML =""; 
  doneList.innerHTML ="";

  // forEach로 todos배열(완료x)을 돌면서 하나씩 꺼냄
  todos.forEach((todo) : void => {
    const li = createTodoElement(todo,false);
    // 각 todo 객체마다 함수(<li>와 버튼을 만듦) 호출
    // - false : 아직 완료되지 않은 항목이라는 의미
    todoList.appendChild(li);// ul에 li붙임
  });

  doneTasks.forEach((todo) : void => {
    const li = createTodoElement(todo,true);
    // - true : 완료된 항목이라는 의미
    doneList.appendChild(li);
  });
};

// 3. 할 일 텍스트 입력 처리 함수. (공백 잘라줌)
const getTodoText = (): string => {
  return todoInput.value.trim();
} 
// 4. 할 일 추가 처리 함수
const addTodo = (text:string) : void => {
  todos.push({id : Date.now() , text}); // 완료된 배열로 푸시
  todoInput.value = ''; // 입력창 비움
  renderTasks();
}

// 5. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo: Todo) :void => {
  todos = todos.filter((t) : boolean => t.id !== todo.id); // 클릭한 일 todos 배열에서 제거
  doneTasks.push(todo); // 완료된 일 배열로 푸시
  renderTasks();
}
// 6. 완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo) :void => {
  doneTasks = doneTasks.filter((t) : boolean => t.id !== todo.id);
  renderTasks();
}

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone: boolean) : HTMLElement => {
  const li = document.createElement('li');
  li.classList.add('render-container__item');
  li.textContent = todo.text;

  const button = document.createElement('button');
  button.classList.add('render-container__item-button');

  if (isDone) {
    button.textContent = '삭제';
    button.style.backgroundColor = '#dc3545';
  } else {
    button.textContent = '완료';
    button.style.backgroundColor = '#28a745';
  }

  button.addEventListener('click', () : void => {
    if (isDone) { //완료된 일일 경우
      deleteTodo(todo); // 삭제 버튼
    } else { 
      completeTodo(todo); // 완료 버튼
    }
  });

  li.appendChild(button);
  return li;
};

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event : Event) : void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});