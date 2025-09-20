"use strict";
const todoInput = document.getElementById('todoInput');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todos = [];
let doneTodos = [];
const renderTask = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTodos.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTask();
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTodos.push(todo);
    renderTask();
};
const deleteTodo = (todo) => {
    doneTodos = doneTodos.filter((t) => t.id !== todo.id);
    renderTask();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    const button = document.createElement('button');
    if (isDone) {
        button.textContent = "삭제";
    }
    else {
        button.textContent = "완료";
    }
    button.addEventListener('click', () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(button);
    return li;
};
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTask();
