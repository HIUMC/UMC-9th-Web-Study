import { useState, type FormEvent } from "react";
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useTodo } from "../context/TodoContext";

const Todo = () => {
    const [input, setInput] = useState<string>('');
    const {todos, completeTodo, addTodo, deleteTodo, doneTodos} = useTodo();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = input.trim();
    
        if (text) {
            addTodo(text);
            setInput('');
        }
    };

    return (
        <div className='todo-container'>
            <h1 className='todo-container__header'>Tellie TODO</h1>
            <TodoForm input={input} setInput={setInput} handleSubmit={handleSubmit} />
            <div className='render-container'>
                <TodoList title='할 일' todos={todos} buttonLabel='완료' buttonColor = '#28a745' onClick={completeTodo} />
                <TodoList title='완료' todos={doneTodos} buttonLabel='삭제' buttonColor = '#dc3545' onClick={deleteTodo} />
            </div>
        </div>
    );
};

export default Todo;