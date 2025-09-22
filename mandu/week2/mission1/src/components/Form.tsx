import {useState} from 'react';
import {useTodo} from '../context/TodoProvider';

const Form = () => {
    const [inputValue,setInputValue] = useState('');
    const {addTodos} = useTodo(); // context 사용
    const hanldeSubmit = (e:React.FormEvent<HTMLInputElement>) =>{
        e.preventDefault();
        if(inputValue.trim() === '') return;
        addTodos(inputValue);
        setInputValue('');
    }
    return(
        <div>
            <h1>MANDU TODO</h1>
            <form onSubmit={hanldeSubmit}>
                <input type="text"
                id="todo-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="todo-container__input"
                placeholder="할 일 입력"
                required/>
                <button type="submit" className="todo-container__button">할 일 추가</button>
            </form>
        </div>
    )
}

export default Form;