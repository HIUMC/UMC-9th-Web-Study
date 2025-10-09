const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTasks = (): void => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    todos.forEach((todo): void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo): void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

const getTodoText = (): string => {
    return todoInput.value.trim();
};
const addTodo = (text: string): void => {
    todos.push({id: Date.now(), text});
    todoInput.value="";
    renderTasks();
};
const compleTodo = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    renderTasks();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLElement => {
    const li = document.createElement("li");
    li.classList.add("render-container_item");
    li.textContent = todo.text;

    const button = document.createElement("button");
    button.classList.add("render-container_item-button");

    if(isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "#dc3545";
    } else {
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
    }

    button.addEventListener("click", (): void => {
        if(isDone) {
            deleteTodo(todo);
        } else {
            compleTodo(todo);
        }
    });

    li.appendChild(button);
    return li;
};

todoForm.addEventListener("submit", (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if(text) {
        addTodo(text);
    }
});

renderTasks();