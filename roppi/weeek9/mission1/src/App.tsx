import { Provider } from 'react-redux'
import './App.css'
import CartList from './components/CartList'
import NavBar from './components/NavBar'
import store from './store/store'
import PriceBox from './components/PriceBox'

function App() {

  return (
    <Provider store={store}>
    <div className='flex flex-col '> 
      <NavBar />
      <CartList />
    </div>
    <PriceBox />
    </Provider>
  )
}

export default App
