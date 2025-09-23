const todoInput = document.getElementById('todoInput') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

let todos: Todo[] = [];

const renderTask = ():void =>{
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo):void => {
        const li = createTodoElement(todo);
        if(todo.isDone){
            doneList.appendChild(li);
        }
        else{todoList.appendChild(li);}
    })
}

const getTodoText = (): string =>{
    return todoInput.value.trim();
}

const addTodo = (text: string): void=>{
    todos.push({id:Date.now(),text,isDone:false});
    todoInput.value = '';
    renderTask();
}

const completeTodo = (todo: Todo):void=>{
    const nowTodo = todos.find((t) => t.id === todo.id);
    if(nowTodo){
        nowTodo?.isDone = !nowTodo.isDone;
    }
    renderTask();
}

const deleteTodo = (id: number):void=>{
    todos = todos.filter((t):boolean => t.id !== id);
    renderTask();
}

const createTodoElement = (todo:Todo):HTMLLIElement =>{
    const li = document.createElement('li');
    li.textContent = todo.text;
    const button = document.createElement('button');

    if(todo.isDone){
        button.textContent = "삭제";
    }
    else{
        button.textContent = "완료";
    }
    button.addEventListener('click', ():void =>{
        if(todo.isDone){
            deleteTodo(todo.id);
        } else{
            completeTodo(todo);
        }
    })
    li.appendChild(button);
    return li;
}
todoForm.addEventListener('submit', (e:Event):void =>{
    e.preventDefault();
    const text = getTodoText();
    if(text){
        addTodo(text);
    }
} );

renderTask();