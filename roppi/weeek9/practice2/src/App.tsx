import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import RandomNumberGenerater from './components/RandomNumberGenerater'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full flex flex-col items-center justify-center gap-4 mt-20'>
    <Counter />
    <RandomNumberGenerater />
    </div>
  )
}

export default App
