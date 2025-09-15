// 1. 필요한 HTML 요소들 선택하기
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list'); // '해야 할 일' 목록
const doneList = document.getElementById('done-list'); // '해낸 일' 목록

function addTodo(text){

    const li = document.createElement("li");
    li.classList.add('render-container__item');

    const span = document.createElement("span");
    span.classList.add('render-container__text');
    span.textContent = text;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = '완료';
    completeBtn.classList.add("render-container__button");

    completeBtn.addEventListener("click", () => {
        completeTodo(li,text);
    });


    li.appendChild(span);
    li.appendChild(completeBtn);
    todoList.appendChild(li);
}


function completeTodo(li, text){ 
    li.remove();
    const doneTask = document.createElement("li");
    doneTask.classList.add("render-container__item");

    const span  = document.createElement("span");
    span.classList.add("rander-container__text");
    span.textContent = text;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("render-container__button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => deleteTask(doneTask));

    doneTask.appendChild(span);
    doneTask.appendChild(deleteBtn);
    doneList.appendChild(doneTask);



    const done = document.createElement("li");
    done.textContent = text;
}



function deleteTask(li){
    li.remove();
}

// enter키 입력 이벤트 처리
todoInput.addEventListener("keydown",(event)=>{
    if (event.key == "Enter"){
        addTodo(todoInput.value);
        todoInput.value = "";
    }
    
});

/*
if (event.key== "Enter"){
        const value = todoInput.value.trim();
        if (value) {
            addTodo(value)
            todoInput.value = "";
        }
        
    }

    */