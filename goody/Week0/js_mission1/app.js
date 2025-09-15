
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

todoInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodo(todoText);
            todoInput.value = '';
        }
    }
});

function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-list__item';

    const span = document.createElement('span');
    span.className = 'todo-list__text';
    span.textContent = text;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'todo-list__btn todo-list__btn--complete';
    completeBtn.textContent = '완료';
    completeBtn.addEventListener('click', completeTodo);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-list__btn todo-list__btn--delete';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', deleteTodo);
    
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    return li;
}


function addTodo(text) {
    const newTodo = createTodoItem(text);
    todoList.appendChild(newTodo);
}


function completeTodo() {
    const item = this.parentElement;
    item.classList.add('todo-list__item');
    doneList.appendChild(item); 
}


function deleteTodo() {
    const item = this.parentElement;
    item.remove();
}