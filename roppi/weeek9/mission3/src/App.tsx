import './App.css'
import CartList from './components/CartList'
import NavBar from './components/NavBar'
import PriceBox from './components/PriceBox'
import Modal from './components/Modal'
import { useModalInfo } from './hooks/useModalStore'


function App() {
  const { isOpen } = useModalInfo();
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
