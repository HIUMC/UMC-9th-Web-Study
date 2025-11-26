import './App.css'
import Counter from './components/Counter'
import RandomNumGenerator from './components/RandomNumGenerator'

function App() {

  return (
    <div style={{
      display : 'flex',
      flexDirection : 'column',
      gap : 100,
    }}>
      <Counter/>
      <RandomNumGenerator/>
    </div>
  )
}

export default App
