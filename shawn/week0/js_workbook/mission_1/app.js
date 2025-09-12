const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

function addTodo(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "완료";
  completeBtn.className = "todo-btn complete-btn";
  completeBtn.onclick = function () {
    completeTodo(li, text);
  };

  li.appendChild(completeBtn);
  todoList.appendChild(li);
}

function completeTodo(li, text) {
  li.remove();
  const doneLi = document.createElement("li");
  doneLi.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.className = "todo-btn delete-btn";
  deleteBtn.onclick = function () {
    doneLi.remove();
  };

  doneLi.appendChild(deleteBtn);
  doneList.appendChild(doneLi);
}

todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const value = todoInput.value.trim();
    if (value) {
      addTodo(value);
      todoInput.value = "";
    }
  }
});
