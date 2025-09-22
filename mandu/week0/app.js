const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

todoInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const todo = todoInput.value.trim();

    if (todo !== '') {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = todo;

        const completeButton = document.createElement('button');
        completeButton.textContent = '완료';
        completeButton.addEventListener('click', completeTodo);
        li.appendChild(span);
        li.appendChild(completeButton);

        todoList.appendChild(li);
        todoInput.value = '';
        todoInput.focus();
    }
}
function completeTodo(e){
    const li = e.target.parentElement;
    doneList.appendChild(li);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', deleteTodo);
    li.appendChild(deleteButton);
    e.target.remove();
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
}