// 1. HTML 요소 선택하기 (핸드북 자바스크립트 편 참고)
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일이 어떻게 생긴애인지 Type을 정의

type Todo = {
    id : number;
    text : string;
};

let todos : Todo[] = [];
let doneTasks : Todo[] = [];
// - 할 일 목록 렌더링 하는 함수를 정의
const renderTasks = () :void =>{
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo) : void => {
        const li = creteTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo) : void => {
        const li = creteTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

// 3. 할 일 텍스트 입력 처리 함수.
const getTodoText = () : string => {
    return todoInput.value.trim();
};


// 4. 할 일 추가 처리 점수
const addTodo = (text: string) : void => {
    todos.push({id: Date.now(), text});
    todoInput.value = "";
    renderTasks();
};

// 5. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo: Todo) : void => {
    todos = todos.filter((t) : boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};

// 6. 완료된 할 일 삭제 함수

const deleteTodo = (todo: Todo) : void => {
    doneTasks = doneTasks.filter((t) : boolean => t.id !== todo.id);
    renderTasks();
};

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트 색상 설정)
const creteTodoElement = (todo : Todo, isDone: boolean) : HTMLElement =>{
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if(isDone) {
        button.textContent = '삭제';
        button.classList.add("render-container__item-button--delete")
    } 
    else{
        button.textContent = '완료';
        button.classList.add("render-container__item-button--complete")
    }
    button.addEventListener('click',() : void => {
        if(isDone){
            deleteTodo(todo);
        }
        else{
            completeTodo(todo);
        }
    });

    li.appendChild(button);
    return li;
};

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit',(event: Event) : void => {
    event.preventDefault(); // 새로고침 안하기
    const text = getTodoText();
    if (text) {
        addTodo(text);
    };
});

renderTasks();

