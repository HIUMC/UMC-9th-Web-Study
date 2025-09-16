
interface Todo {
  id: number;        // 고유 ID
  text: string;      // 할 일 내용
  completed: boolean; // 완료 여부
}

// 버튼 액션 타입 정의
type TodoAction = "complete" | "delete";

// 상태 관리용 배열
let todos: Todo[] = []; 

// DOM 요소 타입 지정
const input = document.querySelector<HTMLInputElement>('.todo__input')!;
const todoList = document.querySelector<HTMLUListElement>('.todo__list--todo')!;
const doneList = document.querySelector<HTMLUListElement>('.todo__list--done')!;


// 이벤트 위임 핸들러
function handleListClick(e: MouseEvent): void {
  const target = e.target as HTMLElement;
  const li = target.closest('li');
  if (!li || !li.dataset.id) return;

  const action = getAction(target); // 클릭한 버튼의 액션 타입 가져오기
  if (!action) return;

  const id = Number(li.dataset.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  if (action === "complete") {
    todo.completed = true;
  } else if (action === "delete") {
    todos = todos.filter(t => t.id !== id);
  }
}

// 버튼에서 액션 타입 반환 함수
function getAction(target: HTMLElement): TodoAction | null {
  if (target.classList.contains('button--complete')) return "complete";
  if (target.classList.contains('button--delete')) return "delete";
  return null;
}

// 부모 ul에 이벤트 한 번만 바인딩
todoList.addEventListener('click', handleListClick);
doneList.addEventListener('click', handleListClick);

// 할 일 추가 함수
function addTodo(text: string): void {
  text = text.trim();
  if (text === '' || isDuplicate(text)) return;

  const li = document.createElement('li');
  li.className = 'todo__item';

  li.innerHTML = `
    <span>${text}</span>
    <button class="button button--complete">완료</button>
  `;

  todoList.appendChild(li);
}

// 완료 처리 함수
function completeTodo(li: HTMLLIElement): void {
  li.classList.add('todo__item--completed');
  todoList.removeChild(li);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  deleteBtn.className = 'button button--delete';
  li.appendChild(deleteBtn);

  const completeBtn = li.querySelector<HTMLButtonElement>('.button--complete');
  if (completeBtn) completeBtn.style.display = 'none';

  doneList.appendChild(li);
}

// 삭제 함수
function deleteTodo(li: HTMLLIElement): void {
  li.remove();
}

// Enter 입력 시 추가
input.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.isComposing) return; // 한글 입력 조합 중이면 무시

  if (e.key === 'Enter') {
    e.preventDefault();
    addTodo(input.value);
    input.value = '';
  }
});

// 중복 검사
function isDuplicate(text: string): boolean {
  text = text.trim();
  if (!text) return true;

  const todoItems = Array.from(todoList.querySelectorAll<HTMLSpanElement>('li span'));
  const doneItems = Array.from(doneList.querySelectorAll<HTMLSpanElement>('li span'));

  const allItems = [...todoItems, ...doneItems];
  return allItems.some(span => span.textContent === text);
}
