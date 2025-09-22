import './App.css'
import { ThemeProvider } from './useContext/context/ThemeProvider'
import ContextPage from './useContext/ContextPage'


const App = () => {
  return (
    <div>
      <ThemeProvider>
        <ContextPage/>
      </ThemeProvider>
    </div>
  )
}

export default App
