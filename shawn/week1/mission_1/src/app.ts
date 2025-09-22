const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

function createButton(
  label: string,
  className: string,
  onClick: () => void
): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.className = className;
  btn.onclick = onClick;
  return btn;
}

function addTodo(text: string) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  const completeBtn = createButton("완료", "todo-btn complete-btn", () =>
    completeTodo(li, text)
  );
  li.append(span, completeBtn);
  todoList.appendChild(li);
}

function completeTodo(li: HTMLLIElement, text: string) {
  li.remove();
  const doneLi = document.createElement("li");
  doneLi.textContent = text;

  const deleteBtn = createButton("삭제", "todo-btn delete-btn", () =>
    doneLi.remove()
  );

  doneLi.appendChild(deleteBtn);
  doneList.appendChild(doneLi);
}

todoInput.addEventListener("keyup", function (e: KeyboardEvent) {
  if (e.key === "Enter") {
    const value = todoInput.value.trim();
    if (value) {
      addTodo(value);
      todoInput.value = "";
    }
  }
});

// function addTodo(text: string) {
//   const li = document.createElement("li");

//   const span = document.createElement("span");
//   span.textContent = text;

//   const completeBtn = document.createElement("button");
//   completeBtn.textContent = "완료";
//   completeBtn.className = "todo-btn complete-btn";
//   completeBtn.onclick = () => {
//     completeTodo(li, text);
//   };

//   li.appendChild(span);
//   li.appendChild(completeBtn);
//   todoList.appendChild(li);
// }

// function completeTodo(li: HTMLLIElement, text: string) {
//   li.remove();
//   const doneLi = document.createElement("li");
//   doneLi.textContent = text;

//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "삭제";
//   deleteBtn.className = "todo-btn delete-btn";
//   deleteBtn.onclick = () => {
//     doneLi.remove();
//   };

//   doneLi.appendChild(deleteBtn);
//   doneList.appendChild(doneLi);
// }

// todoInput.addEventListener("keyup", function (e: KeyboardEvent) {
//   if (e.key === "Enter") {
//     const value = todoInput.value.trim();
//     if (value) {
//       addTodo(value);
//       todoInput.value = "";
//     }
//   }
// });
