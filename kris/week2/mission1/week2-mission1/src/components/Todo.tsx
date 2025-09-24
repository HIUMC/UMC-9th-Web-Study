import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useTodo } from "../context/TodoContext";

const Todo = () => {
  const {todos, completeTodo, addTodo, deleteTodo, doneTodos} = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">MY TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList
          title='할 일'
          todos={todos}
          buttonLabel='완료'
          buttonColor='#28a745'
          onClick={completeTodo}
        />
        <TodoList
          title='완료'
          todos={doneTodos}
          buttonLabel='삭제'
          buttonColor='#dc3545'
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;