const input = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list--todo');
const doneList = document.querySelector('.todo__list--done');


// 이벤트 위임
function handleListClick(e) {
  const li = e.target.closest('li'); // 클릭한 li 찾기
  if (!li) return;

  if (e.target.classList.contains('button--complete')) {
    completeTodo(li);
  } else if (e.target.classList.contains('button--delete')) {
    deleteTodo(li);
  }
}

// 부모 ul에 이벤트 한 번만 바인딩
todoList.addEventListener('click', handleListClick);
doneList.addEventListener('click', handleListClick);

// 할 일 추가 함수
// function addTodo(text) {
//   text = text.trim();
//   if (text === '' || isDuplicate(text)) return; // 빈 값 또는 중복이면 추가 X

//   const li = document.createElement('li');
//   li.className = 'todo__item';

//   const span = document.createElement('span');
//   span.textContent = text;

//   const completeBtn = document.createElement('button');
//   completeBtn.textContent = '완료';
//   completeBtn.className = 'button button--complete';
//   completeBtn.addEventListener('click', () => completeTodo(li));


//   li.appendChild(span);
//   li.appendChild(completeBtn);
//   todoList.appendChild(li);
// }

// 할 일 추가 함수 (이벤트 위임 사용)
function addTodo(text) {
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
function completeTodo(li) {
  li.classList.add('todo__item--completed');
  todoList.removeChild(li);
  doneList.appendChild(li);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  deleteBtn.className = 'button button--delete';
  deleteBtn.addEventListener('click', () => deleteTodo(li));
  li.appendChild(deleteBtn);


  li.querySelector('.button--complete').style.display = 'none';
}

// 삭제 함수
function deleteTodo(li) {
  if (li.parentNode) {
    li.parentNode.removeChild(li);
  }
}

// Enter 입력 시 추가
input.addEventListener('keydown', (e) => {
  if (e.isComposing) return; // 한글 입력 조합 중이면 무시

  if (e.key === 'Enter') {
    e.preventDefault(); // 기본 동작 방지

    addTodo(input.value);
    input.value = '';
  }
});

function isDuplicate(text) {
  text = text.trim();
  if (!text) return true; // 빈 문자열도 중복 취급

  // 해야 할 일 목록 검사
  const todoItems = Array.from(todoList.querySelectorAll('li span'));
  const doneItems = Array.from(doneList.querySelectorAll('li span'));

  const allItems = todoItems.concat(doneItems);

  return allItems.some(span => span.textContent === text);
}
