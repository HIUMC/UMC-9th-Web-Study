const todoInput = document.getElementById('todoInput') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
}

let todos: Todo[]=[];
let doneTodos: Todo[]=[];

const renderTask = ():void =>{
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo):void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    })
    doneTodos.forEach((todo):void=>{
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    })
}

const getTodoText = (): string =>{
    return todoInput.value.trim();
}

const addTodo = (text: string): void=>{
    todos.push({id:Date.now(),text});
    todoInput.value = '';
    renderTask();
}

const completeTodo = (todo: Todo):void=>{
    todos = todos.filter((t):boolean => t.id !== todo.id);
    doneTodos.push(todo);
    renderTask();
}

const deleteTodo = (todo: Todo):void=>{
    doneTodos = doneTodos.filter((t):boolean => t.id !== todo.id);
    renderTask();
}

const createTodoElement = (todo:Todo, isDone:boolean):HTMLLIElement =>{
    const li = document.createElement('li');
    li.textContent = todo.text;
    const button = document.createElement('button');

    if(isDone){
        button.textContent = "삭제";
    }
    else{
        button.textContent = "완료";
    }
    button.addEventListener('click', ():void =>{
        if(isDone){
            deleteTodo(todo);
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