// 요소
const form     = document.querySelector('form');
const input    = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

// 템플릿
const tplTodo = document.getElementById('tpl-todo-item');
const tplDone = document.getElementById('tpl-done-item');

// 템플릿 복제 함수
function makeTodoLi(text) {
  const li = tplTodo.content.firstElementChild.cloneNode(true);
  li.querySelector('.text').textContent = text;
  return li;
}
function makeDoneLi(text) {
  const li = tplDone.content.firstElementChild.cloneNode(true);
  li.querySelector('.text').textContent = text;
  return li;
}

// Enter로 추가 → todo-list에 todo 템플릿으로 생성
form.addEventListener('submit', (e) => {
  e.preventDefault(); // 새로고침 방지
  const text = input.value.trim();
  if (!text) return;

  const li = makeTodoLi(text);
  todoList.appendChild(li);

  // 디버그 확인용
  console.log('추가된 todo li:', li.outerHTML);

  input.value = '';
  input.focus();
});

// 완료/삭제 (이벤트 위임)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const li = btn.closest('li.item');
  if (!li) return;

  const action = btn.dataset.action;

  if (action === 'complete') {
    const text = li.querySelector('.text').textContent;
    li.remove();
    const newLi = makeDoneLi(text);
    doneList.appendChild(newLi);
    console.log('이동된 done li:', newLi.outerHTML);
  } else if (action === 'delete') {
    li.remove();
  }
});
