const input = document.querySelector(".todo-input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

// 할 일 추가
function addTodo(text) {
  if (!text.trim()) return;

  // li 생성
  const li = document.createElement("li");
  li.className = "todo-container__item";

  // 텍스트 span
  const span = document.createElement("span");
  span.className = "todo-container__text";
  span.textContent = text;

  // 완료 버튼
  const completeBtn = document.createElement("button");
  completeBtn.className = "todo-container__button";
  completeBtn.textContent = "완료";
  completeBtn.addEventListener("click", () => completeTodo(li, text));

  // 조립
  li.appendChild(span);
  li.appendChild(completeBtn);
  todoList.appendChild(li);
}

// 할 일 완료 → 해낸 일로 이동
function completeTodo(li, text) {
  li.remove();

  const doneItem = document.createElement("li");
  doneItem.className = "todo-container__item";

  const span = document.createElement("span");
  span.className = "todo-container__text";
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "todo-container__button";
  deleteBtn.textContent = "삭제";
  deleteBtn.addEventListener("click", () => deleteTodo(doneItem));

  doneItem.appendChild(span);
  doneItem.appendChild(deleteBtn);
  doneList.appendChild(doneItem);
}

// 해낸 일 삭제
function deleteTodo(li) {
  li.remove();
}

// 이벤트 바인딩 (Enter 입력 시 추가)
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo(input.value);
    input.value = ""; // 입력창 초기화
  }
});
