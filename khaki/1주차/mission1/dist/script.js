// 1. HTML 요소 선택
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todos = [];
let doneTasks = [];
// - 할일 목록 렌더링(코드를 사람이 볼 수 있는 화면으로 바꿔주는 과정) 하는 함수를 정의
const renderTask = () => {
    todoList.innerHTML = ""; // todoList 요소 안의 HTML을 싹 비운다.
    doneList.innerHTML = ""; // doneList 요소 안의 HTML을 싹 비운다.
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
// 3. 할 일 텍스트 입력 처리 함수 (공백 제거)
const getTodoText = () => {
    return todoInput.value.trim();
};
// 4. 할일 추가 처리 함수
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = "";
    renderTask();
};
// 5. 할 일 상태 변경(완료로 이동)
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTask();
};
// 6. 완료된 할 일 삭제 함수
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTask();
};
// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    // class를 수정할 때는 classList가 가장 추천된다!
    li.textContent = todo.text;
    const button = document.createElement('button');
    button.classList.add('render-container__item-button');
    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "#dc3545";
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
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
// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTask();
export {};
//# sourceMappingURL=script.js.map