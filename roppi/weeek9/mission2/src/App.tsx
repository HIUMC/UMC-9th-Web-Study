import './App.css'
import CartList from './components/CartList'
import NavBar from './components/NavBar'
import PriceBox from './components/PriceBox'
import Modal from './components/Modal'
import { useSelector } from './hooks/useCustomRedux'

function App() {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <div>
    <div className='flex flex-col '> 
      {isOpen && <Modal />}

      <NavBar />
      <CartList />
    </div>
    <PriceBox />
    </div>
  )
}

export default App
