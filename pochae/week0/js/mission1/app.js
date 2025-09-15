const input = document.querySelector("input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

// 할 일 추가
function addTodo(text) {
  if (!text.trim()) return; 

  const li = document.createElement("li");
  li.textContent = text;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "완료";
  completeBtn.addEventListener("click", () => completeTodo(li, text));

  li.appendChild(completeBtn);
  todoList.appendChild(li);
}

// 할 일 완료
function completeTodo(li, text) {
  li.remove(); 

  const doneItem = document.createElement("li");
  doneItem.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.addEventListener("click", () => deleteTodo(doneItem));

  doneItem.appendChild(deleteBtn);
  doneList.appendChild(doneItem);
}

// 한 일 삭제
function deleteTodo(li) {
  li.remove();
}

// 이벤트 바인딩
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo(input.value);
    input.value = ""; // 입력창 초기화
  }
});
