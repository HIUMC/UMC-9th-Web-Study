import { useContext } from 'react'
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css'

function App() {

  return (
    <>
      <div className='todo-container'>
        <Form/>
        <TodoList />
      </div>
    </>
  )
}

export default App
